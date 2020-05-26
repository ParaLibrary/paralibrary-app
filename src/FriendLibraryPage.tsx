import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { useParams } from "react-router";

import PageLayout from "./PageLayout";
import { Book, Loan, User } from "./ourtypes";
import AutoTable, { TableColumn } from "./AutoTable";
import LoanRequestButton from "./LoanRequestButton";
import { toLibrary } from "./mappers";
import LibrarySearchBar from "./LibrarySearchBar";
import FriendshipStatusButton from "./FriendshipStatusButton";
import { AuthContext } from "./AuthContextProvider";

const FriendLibraryPage: React.FC = () => {
  const { id } = useParams();
  const auth = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>();
  const [searchTerm, setSearchTerm] = useState("");

  function filterResults(searchTerm: string) {
    setSearchTerm(searchTerm);
  }

  const filteredBooks: Book[] = useMemo(() => {
    const regExp = new RegExp(searchTerm.trim(), "gi");
    if (searchTerm === "") {
      return books;
    }
    return books.filter(
      (book: Book) => book.title.match(regExp) || book.author.match(regExp)
    );
  }, [searchTerm, books]);

  useEffect(() => {
    fetch(`http://paralibrary.digital/api/libraries/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          const lib = toLibrary(result);
          setBooks(lib.books);
          setUser(lib.user);
        },
        (e) => {
          console.log(e);
          setError(true);
        }
      )
      .catch((e) => {
        console.log(e);
        setError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [id]);

  const handleRequest = useCallback(
    (bookID: string) => {
      fetch("http://paralibrary.digital/api/loans", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: bookID,
          requester_id: auth.credential.userId,
          status: "pending",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const owner: User = user || { id: "", name: "", status: null };
          const requester: User = {
            id: auth.credential.userId || "",
            name: "",
            status: null,
          };
          const loan: Loan = {
            id: res.id,
            status: "pending",
            owner,
            requester,
            requester_contact: "",
          };
          setBooks(
            books.map((book) =>
              book.id !== bookID
                ? book
                : {
                    ...book,
                    loan,
                  }
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [auth, books, user]
  );

  const handleCancel = useCallback(async (loan: Loan) => {
    fetch(`http://paralibrary.digital/api/loans/${loan.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loan),
    });
  }, []);

  return (
    <PageLayout
      header={
        !user ? <h1>User Not Found</h1> : <h1>{user && user.name}'s Library</h1>
      }
      error={error}
      loaded={isLoaded}
    >
      {user && <FriendshipStatusButton friend={user} onClick={setUser} />}
      <LibrarySearchBar
        onSearchChange={filterResults}
        header="Search this Library"
      />
      <AutoTable
        data={filteredBooks}
        title={<h3>Books</h3>}
        placeholder={
          books ? (
            <span>No search results found</span>
          ) : (
            <span>
              Huh, looks like {user && user.name} hasn't added anything to their
              library.
            </span>
          )
        }
      >
        <TableColumn col="title">Title</TableColumn>
        <TableColumn col="author">Author</TableColumn>
        <TableColumn col="summary">Description</TableColumn>
        <LoanRequestButton onRequest={handleRequest} onCancel={handleCancel} />
      </AutoTable>
    </PageLayout>
  );
};

export default FriendLibraryPage;
