import React, {
  useState,
  cloneElement,
  useMemo,
  ReactElement,
  Component,
  useEffect,
} from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router";

import PageLayout from "./PageLayout";
import BookFormik from "./BookForm";
import AutoTable, { TableColumn } from "./AutoTable";
import { Book, User } from "./ourtypes";

import { Table } from "react-bootstrap";
import styled from "styled-components";

interface ButtonGroupProps {
  id: number;
  onEdit: (id: number) => {};
}

const LibraryPage: React.FC = () => {
  const emptyBook: Book = {
    id: "",
    user_id: "", // We will need to set this when user authentification happens
    isbn: "",
    summary: "",
    title: "",
    author: "",
    visibility: "public",
  };
  const openBook: Book = {
    id: "0",
    user_id: "0",
    title: "",
    author: "",
    isbn: "",
    summary: "",
    visibility: "public",
  };

  const { id } = useParams();
  const [booksAreLoaded, setBooksAreLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewBook, setIsNewBook] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
  const [user, setUser] = useState<User>();
  const [tableData] = useState<Book[]>([]);
  useEffect(() => {
    fetch(`http://paralibrary.digital/api/books`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(
        (result) => {
          setBooks(result as Book[]);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setBooksAreLoaded(true);
      });
  }, []);
  useEffect(() => {
    fetch(`http://paralibrary.digital/api/library`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(
        (result) => {
          setBooks(result as Book[]);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setBooksAreLoaded(true);
      });
  }, []);
  const tableSampleData: Book = {
    id: "1",
    user_id: "1",
    title: "Test book",
    author: "Some Schmuck",
    isbn: "978-3-16-148410-0",
    summary:
      "this is an example of when I am putting in data with no idea of what to write in.",
    visibility: "public",
  };
  useEffect(() => {
    fetch(`http://paralibrary.digital/api/books/${id}`)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setUser(result);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  console.log("http://paralibrary.digital/api/Library");

  return (
    <PageLayout>
      <h1>My Library</h1>

      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isNewBook ? "Add Book" : "Edit Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookFormik
            book={selectedBook}
            updateBookList={() => useEffect}
            updateDatabase={() => useEffect}
            closeModal={() => setModalOpen(false)}
          />
        </Modal.Body>
      </Modal>

      <Button onClick={() => setModalOpen(true)}>New Book</Button>

      <AutoTable data={[tableSampleData]}>
        <TableColumn col="title">Title</TableColumn>
        <TableColumn col="author">Author</TableColumn>
        <TableColumn col="summary">Summary</TableColumn>
        <Button onClick={() => setModalOpen(true)}>Edit</Button>
      </AutoTable>
    </PageLayout>
  );
};

export default LibraryPage;
