import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { Redirect, useParams } from "react-router";

import PageLayout from "./PageLayout";
import { Book, Loan, User } from "./ourtypes";
import { toLibrary } from "./mappers";
import LibrarySearchBar from "./LibrarySearchBar";
import FriendshipStatusButton from "./FriendManagers";
import { AuthContext } from "./AuthContextProvider";
import BookCard from "./BookCard";
import List from "./List";
import { SingleUserProvider } from "./UserListContext";

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

  const userStatus = useMemo(() => {
    return user?.status;
  }, [user]);

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
  }, [id, userStatus]);

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
          const emptyUser: User = {
            id: "",
            name: "",
            status: null,
            email: "",
            picture: "",
          };
          const owner: User = user || emptyUser;
          const requester: User = {
            ...emptyUser,
            id: auth.credential.userId || "",
          };
          const loan: Loan = {
            id: res.id,
            status: "pending",
            owner,
            requester,
          };
          setBooks(
            books.map((book) => (book.id !== bookID ? book : { ...book, loan }))
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

  if (auth.credential.userId === id) {
    return <Redirect to="/library" />;
  } else {
    return (
      <PageLayout
        header={
          !user ? (
            <h1>User Not Found</h1>
          ) : (
            <h1>{user && user.name}'s Library</h1>
          )
        }
        error={error}
        loaded={isLoaded}
      >
        {user && (
          <SingleUserProvider user={user} setUser={setUser}>
            <FriendshipStatusButton friend={user} />
          </SingleUserProvider>
        )}
        <LibrarySearchBar
          onSearchChange={filterResults}
          header="Search this Library"
        />

        <List
          title={<h3>Books</h3>}
          items={filteredBooks}
          component={BookCard}
          userRole="requester"
          onRequest={handleRequest}
          onCancel={handleCancel}
          friendStatus={userStatus}
          placeholder={
            books.length ? (
              <span>No search results found</span>
            ) : (
              <span>
                Huh, looks like {user ? user.name : "this user"} hasn't added
                anything to their library, or their privacy settings don't allow
                you to see this library.
              </span>
            )
          }
        />
      </PageLayout>
    );
  }
};

export default FriendLibraryPage;
