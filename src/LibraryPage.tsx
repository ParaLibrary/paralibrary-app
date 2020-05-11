import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import PageLayout from "./PageLayout";
import LoanStatus from "./LoanStatus";
import BookFormik from "./BookForm";
import { Book } from "./ourtypes";
import AutoTable, { TableColumn } from "./AutoTable";

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
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
  const tableData: Book[] = [
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
  ];

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
            updateBookList={() => null}
            updateDatabase={() => null}
            closeModal={() => setModalOpen(false)}
          />
        </Modal.Body>
      </Modal>

      <Button onClick={() => setModalOpen(true)}>New Book</Button>

      <AutoTable data={tableData}>
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
