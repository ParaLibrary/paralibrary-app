import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router";

import PageLayout from "./PageLayout";
import BookFormik from "./BookForm";
import AutoTable, { TableColumn } from "./AutoTable";
import { Book, User } from "./ourtypes";

import { Table } from "react-bootstrap";
import styled from "styled-components";
import LibrarySearchBar from "./LibrarySearchBar";
import { toLibrary, toUser } from "./mappers";

interface ButtonGroupProps {
  id: number;
  onEdit: (id: number) => {};
}

const LibraryPage: React.FC = () => {
  const emptyBook: Book = {
    id: "",
    user_id: "",
    isbn: "",
    summary: "",
    title: "",
    author: "",
    visibility: "public",
  };
  const openBook: Book = {
    id: "",
    user_id: "",
    title: "",
    author: "",
    isbn: "",
    summary: "",
    visibility: "public",
  };

  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>();
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewBook, setIsNewBook] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book>({
    id: "",
    user_id: "",
    title: "",
    author: "",
    isbn: "",
    summary: "",
    visibility: "private",
  });

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
    console.log(user);
  }, [user]);
  useEffect(() => {
    fetch(`http://paralibrary.digital/api/libraries/`, {
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
          console.log(user);
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
  const updateDatabase = useCallback(
    (book: Book) => {
      book.user_id = user ? user.id : "";
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
        .then((res: Book) => {
          setBooks(books.concat(res));
        })
        .catch(() => false);
    },
    [books]
  );
  const fetchBooks = useCallback(
    (book: Book) => {
      setBooks((books) => [...books, book]);
    },
    [books]
  );
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
            updateBookList={fetchBooks}
            updateDatabase={updateDatabase}
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
        <TableColumn col="isbn">ISBN</TableColumn>
        <TableColumn col="summary">Summary</TableColumn>
        <Button onClick={() => setModalOpen(true)}>Edit</Button>
      </AutoTable>
    </PageLayout>
  );
};

export default LibraryPage;
