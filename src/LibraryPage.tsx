import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import PageLayout from "./PageLayout";
import BookFormik from "./BookForm";
import { Book } from "./ourtypes";

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

  return (
    <PageLayout>
      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

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
    </PageLayout>
  );
};

export default LibraryPage;
