import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";

import { Modal, Button } from "react-bootstrap";

import PageLayout from "./PageLayout";
import BookFormik from "./BookForm";
import AutoTable, { TableColumn } from "./AutoTable";
import { Book, User } from "./ourtypes";
import LibrarySearchBar from "./LibrarySearchBar";
import { toLibrary, toUser } from "./mappers";
import { AuthContext } from "./AuthContextProvider";

interface ButtonGroupProps {
  id: number;
  onEdit: (id: number) => {};
}

const LibraryPage: React.FC = () => {
  const user_idGet = useContext(AuthContext);
  const emptyBook: Book = {
    id: "",
    user_id: user_idGet.credential.userId || "",
    isbn: "",
    summary: "",
    title: "",
    author: "",
    visibility: "public",
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>();
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewBook, setIsNewBook] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
  const [editModalClose, editBook] = useState(false);

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

  useEffect(() => {}, [user]);
  useEffect(() => {
    fetch(`http://paralibrary.digital/api/libraries`, {
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
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);
  const addToDatabase = useCallback(
    (book: Book) => {
      let BookString = JSON.stringify(book);
      fetch("http://paralibrary.digital/api/books", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: BookString,
      })
        .then((res) => res.json())
        .then((res: { id: string }) => {
          setBooks(books.concat({ ...book, id: res.id }));
        })
        .catch(() => false);
    },
    [books]
  );
  const editBookDatabase = useCallback((book: Book) => {
    let BookString = JSON.stringify(book);
    fetch(`http://paralibrary.digital/api/books/${book.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: BookString,
    })
      .then(() => {
        console.log(books);
        let newBooks = books.map((b) => {
          console.log(b);
          if (b.id === book.id) {
            return book;
          }
          return b;
        });
        console.log(newBooks);
        setBooks(newBooks);
      })
      .catch((err) => console.error(err));
  }, []);

  const putBook = useCallback(
    (book: Book) => {
      let BookString = JSON.stringify(book);
      fetch("http://paralibrary.digital/api/books", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: BookString,
      }).catch(() => false);
    },
    [books]
  );
  const handleCancel = useCallback(async (book: Book) => {
    fetch(`http://paralibrary.digital/api/books/${book.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(books),
    });
  }, []);

  return (
    <PageLayout header={<h1>My Library</h1>}>
      <LibrarySearchBar
        onSearchChange={filterResults}
        header="Search Your Library"
      />
      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isNewBook ? "Add Book" : "Edit Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookFormik
            book={selectedBook}
            updateDatabase={isNewBook ? addToDatabase : editBookDatabase}
            closeModal={() => setModalOpen(false)}
          />
        </Modal.Body>
      </Modal>

      <Button
        onClick={() => {
          setSelectedBook(emptyBook);
          setModalOpen(true);
          setIsNewBook(true);
        }}
      >
        New Book
      </Button>

      <AutoTable
        data={filteredBooks}
        placeholder={
          books ? (
            <span>No search results found</span>
          ) : (
            <span>Press the Add Book button to get started!</span>
          )
        }
      >
        <TableColumn col="title">Title</TableColumn>
        <TableColumn col="author">Author</TableColumn>
        <TableColumn col="summary">Summary</TableColumn>
        <BookEditButton
          onEdit={(b) => {
            setIsNewBook(false);
            setModalOpen(true);
            if (b) {
              setSelectedBook(b);
            }
          }}
        ></BookEditButton>
      </AutoTable>
    </PageLayout>
  );
};
interface editBookProps {
  rowitem?: Book;
  onEdit: (book: Book | undefined) => void;
}
const BookEditButton: React.FC<editBookProps> = ({ rowitem, onEdit }) => {
  return (
    <Button
      onClick={() => {
        onEdit(rowitem);
      }}
    >
      Edit
    </Button>
  );
};
export default LibraryPage;
