import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";

import PageLayout from "./PageLayout";
import LoanStatus from "./LoanStatus";
import BookFormik from "./BookForm";
import { Book } from "./ourtypes";
import AutoTable, { TableColumn } from "./AutoTable";
import LibrarySearchBar from "./LibrarySearchBar";

interface ButtonGroupProps {
  id: number;
  onEdit: (id: number) => {};
}

const LibraryPage: React.FC = () => {
  const emptyBook: Book = {
    id: "",
    user_id: "", // We will need to set this when user authentification happens
    title: "",
    author: "",
    isbn: "",
    summary: "",
    visibility: "public",
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [isNewBook, setIsNewBook] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
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
    setBooks([
      {
        id: "1",
        user_id: "1",
        title: "Test book 1",
        author: "A",
        isbn: "978-3-16-148410-0",
        summary:
          "this is an example of when I am putting in data with no idea of what to write in.",
        visibility: "public",
      },
      {
        id: "2",
        user_id: "1",
        title: "Test book 2",
        author: "B",
        isbn: "978-3-16-148410-0",
        summary:
          "this is an example of when I am putting in data with no idea of what to write in.",
        visibility: "public",
        loan: {
          id: "1",
          book_id: "2",
          status: "pending",
          owner: {
            id: "1",
            name: "Bob",
          },
          requester: {
            id: "2",
            name: "Sally",
          },
          owner_contact: "",
          requester_contact: "",
          accept_date: new Date(),
          request_date: new Date(),
          loan_start_date: new Date(),
          loan_end_date: new Date(),
        },
      },
    ]);
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
            updateBookList={() => null}
            updateDatabase={() => null}
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
        <TableColumn col="loan" component={LoanStatus}>
          Status
        </TableColumn>
      </AutoTable>
    </PageLayout>
  );
};

export default LibraryPage;
