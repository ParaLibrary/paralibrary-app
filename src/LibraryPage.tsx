import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { Modal } from "react-bootstrap";

import PageLayout from "./PageLayout";
import BookFormik from "./BookForm";
import { Book, User } from "./ourtypes";
import { toLibrary } from "./mappers";
import { AuthContext } from "./AuthContextProvider";
import { useToasts } from "./ToastProvider";
import LibraryToolbar from "./LibraryToolbar";
import List from "./List";
import BookCard from "./BookCard";
import LibraryHeader from "./LibraryHeader";

const LibraryPage: React.FC = () => {
  const user_idGet = useContext(AuthContext);
  const emptyBook: Book = {
    id: "",
    user_id: user_idGet.credential.userId || "",
    isbn: "",
    categories: [],
    summary: "",
    title: "",
    author: "",
    visibility: "public",
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>();
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewBook, setIsNewBook] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>();
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
  const { addToast } = useToasts();

  const categories = useMemo(
    () =>
      Array.from(
        new Set(books.flatMap((book: Book) => book.categories))
      ).sort(),
    [books]
  );

  function filterResults(searchTerm: string) {
    setSearchTerm(searchTerm);
  }

  const filteredBooks: Book[] = useMemo(() => {
    const regExp = new RegExp(searchTerm.trim(), "gi");
    return books.filter(
      (book: Book) =>
        (!searchTerm ||
          book.title.match(regExp) ||
          book.author.match(regExp)) &&
        (!categoryFilter || book.categories.includes(categoryFilter))
    );
  }, [searchTerm, books, categoryFilter]);

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
          setUser(lib.user);
          setBooks(lib.books.reverse());
        },
        (error) => {
          console.log(error);
          setError(true);
        }
      )
      .catch((error) => {
        console.log(error);
        setError(true);
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
          setBooks([{ ...book, id: res.id }].concat(books));
        })
        .catch(() => false);
    },
    [books]
  );
  const deleteBook = useCallback(
    (book: Book) => {
      fetch(`http://paralibrary.digital/api/books/${book.id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            setBooks(books.filter((books) => books.id !== book.id));
            addToast({
              header: "Book Deleted",
              body: "Book successfully deleted.",
              type: "success",
            });
          } else {
            throw Error();
          }
        })
        .catch((error) => {
          console.log(error);
          addToast({
            header: "Could not delete loan",
            body: "Something went wrong. Please try again in a few moments",
            type: "error",
          });
        });
    },
    [books, addToast]
  );

  const editBookDatabase = useCallback(
    (book: Book) => {
      let BookString = JSON.stringify(book);
      fetch(`http://paralibrary.digital/api/books/${book.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: BookString,
      })
        .then((res) => {
          if (res.ok) {
            let newBooks = books.map((b) => {
              if (b.id === book.id) {
                return book;
              }
              return b;
            });
            setBooks(newBooks);
          }
        })
        .catch((err) => console.error(err));
    },
    [books]
  );

  const openNewBook = useCallback(() => {
    setSelectedBook(emptyBook);
    setModalOpen(true);
    setIsNewBook(true);
  }, [emptyBook]);

  return (
    <PageLayout
      header={<LibraryHeader picture={user && user.picture} />}
      error={error}
      loaded={isLoaded}
    >
      <LibraryToolbar
        onCategoryChange={setCategoryFilter}
        options={categories}
        onSearchChange={filterResults}
        onAddBook={openNewBook}
      />

      <List
        title={<h3>Books</h3>}
        items={filteredBooks}
        component={BookCard}
        onEdit={(book: Book) => {
          setIsNewBook(false);
          setModalOpen(true);
          if (book) {
            setSelectedBook(book);
          }
        }}
        onDelete={deleteBook}
        userRole="owner"
        placeholder={
          books.length ? (
            <span>No search results found</span>
          ) : (
            <span>Press the Add Book button to get started!</span>
          )
        }
      />

      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isNewBook ? "Add Book" : "Edit Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookFormik
            categoryOptions={categories}
            book={selectedBook}
            updateDatabase={isNewBook ? addToDatabase : editBookDatabase}
            closeModal={() => setModalOpen(false)}
          />
        </Modal.Body>
      </Modal>
    </PageLayout>
  );
};

export default LibraryPage;
