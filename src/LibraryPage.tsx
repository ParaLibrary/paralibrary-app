import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import PageLayout from "./PageLayout";
import BookFormik from "./BookForm";
import { Book, BookVisibility } from "./ourtypes";

const LibraryPage: React.FC = () => {
  const emptyBook: Book = {
    id: 0,
    user_id: 0, // We will need to set this when user authentification happens
    title: "",
    author: "",
    isbn: "",
    summary: "",
    visibility: BookVisibility.public,
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [isNewBook, setIsNewBook] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);

  return (
    <PageLayout>
      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isNewBook ? "Add Book" : "Edit Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookFormik book={selectedBook} />
        </Modal.Body>
      </Modal>
    </PageLayout>
  );
};

export default LibraryPage;
