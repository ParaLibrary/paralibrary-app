import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

interface BookFormProps {}

const BookForm: React.FC<BookFormProps> = () => {
  return (
    <Form>
      <Form.Group as={Form.Row} controlId="bookTitle">
        <Form.Label column sm={2}>
          Title:
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" />
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row} controlId="bookAuthor">
        <Form.Label column sm={2}>
          Author:
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" />
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row} controlId="bookISBN">
        <Form.Label column sm={2}>
          ISBN:
        </Form.Label>
        <Col sm={6}>
          <Form.Control type="text" />
        </Col>
        <Col sm={4}>
          <Button disabled>Import Data</Button>
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row} controlId="bookSummary">
        <Form.Label column sm={2}>
          Summary:
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="textarea" rows={3} />
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row} controlId="bookVis">
        <Form.Check type="switch" label="Private" />
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default BookForm;
