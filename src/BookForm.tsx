import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { Formik, FormikProps } from "formik";

import { Book } from "./ourtypes";

const BookForm: React.FC<FormikProps<Book>> = ({
  handleSubmit,
  handleChange,
  values,
  touched,
  errors,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Form.Row} controlId="bookTitle">
        <Form.Label column sm={2}>
          Title:
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            isValid={touched.title && !errors.title}
          />
        </Col>
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Form.Row} controlId="bookAuthor">
        <Form.Label column sm={2}>
          Author:
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="author"
            value={values.author}
            onChange={handleChange}
            isValid={touched.author && !errors.author}
          />
        </Col>
        <Form.Control.Feedback type="invalid">
          {errors.author}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Form.Row} controlId="bookISBN">
        <Form.Label column sm={2}>
          ISBN:
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            name="isbn"
            value={values.isbn}
            onChange={handleChange}
            isValid={touched.isbn && !errors.isbn}
          />
        </Col>
        <Col sm={4}>
          <Button disabled>Import Data</Button>
        </Col>
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Form.Row} controlId="bookSummary">
        <Form.Label column sm={2}>
          Summary:
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            name="summary"
            value={values.summary}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row} controlId="bookVis">
        <Form.Check
          type="switch"
          label="Private"
          name="visibility"
          value={values.visibility}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  );
};

interface BookFormProps {
  book: Book;
  updateBookList?: (book: Book) => void;
  updateDatabase?: (book: Book) => void;
}

const BookFormik: React.FC<BookFormProps> = ({ book }) => {
  return (
    <Formik
      initialValues={book}
      onSubmit={console.log}
      component={BookForm}
    ></Formik>
  );
};

export default BookFormik;
