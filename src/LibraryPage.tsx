import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import PageLayout from "./PageLayout";
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
    private: false,
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [isNewBook, setIsNewBook] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
  const tableData = [
    {
      id: "1",
      user_id: "1",
      title: "Test book",
      author: "Some ",
      isbn: "978-3-16-148410-0",
      summary:
        "this is an example of when I am putting in data with no idea of what to write in.",
      private: false,
    },
    {
      id: "2",
      user_id: "1",
      title: "Test book",
      author: "Some ",
      isbn: "978-3-16-148410-0",
      summary:
        "this is an example of when I am putting in data with no idea of what to write in.",
      private: false,
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

      <AutoTable data={tableData} tableAs="div" rowAs="span">
        <TableColumn col="title">Title</TableColumn>
        <TableColumn col="author">Author</TableColumn>
        <TableColumn col="summary">Summary</TableColumn>
        <button>Edit</button>
      </AutoTable>
    </PageLayout>
  );
};

export default LibraryPage;
