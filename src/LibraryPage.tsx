import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import PageLayout from "./PageLayout";
import BookForm from "./BookForm";

const LibraryPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageLayout>
      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm />
        </Modal.Body>
      </Modal>
    </PageLayout>
  );
};

export default LibraryPage;
