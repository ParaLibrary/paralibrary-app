import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router";

import PageLayout from "./PageLayout";
import BookFormik from "./BookForm";
import AutoTable, { TableColumn } from "./AutoTable";
import { Book, User } from "./ourtypes";

import { Table } from "react-bootstrap";
import styled from "styled-components";
import LibrarySearchBar from "./LibrarySearchBar";
import { toLibrary } from "./mappers";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewBook, setIsNewBook] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);

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
    fetch(`http://paralibrary.digital/api/libraries/`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setBooks([
            {
              id: "1",
              user_id: "1",
              title: "Test book",
              author: "Some Schmuck",
              isbn: "978-3-16-148410-0",
              summary:
                "this is an example of when I am putting in data with no idea of what to write in.",
              visibility: "public",
            },
            {
              id: "21",
              user_id: "3",
              title: "Test book",
              author: "Some Schmuck",
              isbn: "978-3-16-148410-0",
              summary:
                "this is an example of when I am putting in data with no idea of what to write in.",
              visibility: "public",
            },
            {
              id: "22",
              user_id: "3",
              title: "Test book",
              author: "Some Schmuck",
              isbn: "978-3-16-148410-0",
              summary:
                "this is an example of when I am putting in data with no idea of what to write in.",
              visibility: "public",
            },
            {
              id: "23",
              user_id: "3",
              title: "Test book",
              author: "Some Schmuck",
              isbn: "978-3-16-148410-0",
              summary:
                "this is an example of when I am putting in data with no idea of what to write in.",
              visibility: "public",
            },
            {
              id: "24",
              user_id: "3",
              title: "Test book",
              author: "Some Schmuck",
              isbn: "978-3-16-148410-0",
              summary:
                "this is an example of when I am putting in data with no idea of what to write in.",
              visibility: "public",
            },
          ]);
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
            updateBookList={() => useEffect}
            updateDatabase={() => useEffect}
            closeModal={() => setModalOpen(false)}
          />
        </Modal.Body>
      </Modal>

      <Button onClick={() => setModalOpen(true)}>New Book</Button>

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
