import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import PageLayout from "./PageLayout";

const LibraryPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageLayout>
      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>Testing</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </PageLayout>
  );
};

export default LibraryPage;
