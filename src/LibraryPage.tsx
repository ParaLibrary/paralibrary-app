import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";

import PageLayout from "./PageLayout";
import BookFormik from "./BookForm";
import AutoTable, { TableColumn } from "./AutoTable";
import { Book, User, Option } from "./ourtypes";
import LibrarySearchBar from "./LibrarySearchBar";
import { toLibrary } from "./mappers";
import { AuthContext } from "./AuthContextProvider";
import { useToasts } from "./ToastProvider";

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
  const [catSelected, setCatSelected] = useState<Option>();
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
  const { addToast } = useToasts();

  const categories = useMemo(
    () => Array.from(new Set(books.flatMap((book: Book) => book.categories))),
    [books]
  );

  const makeOptions = useCallback(
    (options: string[]) =>
      options.map((category) => {
        return { value: category, label: category };
      }),
    []
  );

  function filterResults(searchTerm: string) {
    setSearchTerm(searchTerm);
  }

  const filteredBooks: Book[] = useMemo(() => {
    const regExp = new RegExp(searchTerm.trim(), "gi");
    console.log(catSelected);
    return books.filter(
      (book: Book) =>
        (!searchTerm ||
          book.title.match(regExp) ||
          book.author.match(regExp)) &&
        (!catSelected?.value || book.categories.includes(catSelected.value))
    );
  }, [searchTerm, books, catSelected]);

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
          setBooks(books.concat({ ...book, id: res.id }));
        })
        .catch(() => false);
    },
    [books]
  );

  return (
    <PageLayout header={<h1>My Library</h1>} error={error} loaded={isLoaded}>
      <LibrarySearchBar
        onSearchChange={filterResults}
        header="Search Your Library"
      />
      <h6>Filter by Tags</h6>
      <Select
        options={makeOptions(categories)}
        onChange={(option: any) => setCatSelected(option)}
        isClearable
      />
      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isNewBook ? "Add Book" : "Edit Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookFormik
            categoryOptions={categories}
            book={selectedBook}
            updateDatabase={addToDatabase}
            closeModal={() => setModalOpen(false)}
          />
        </Modal.Body>
      </Modal>
      <Button
        onClick={() => {
          setSelectedBook(emptyBook);
          setModalOpen(true);
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
        <Button onClick={() => setModalOpen(true)}>Edit</Button>
      </AutoTable>
    </PageLayout>
  );
};

export default LibraryPage;
