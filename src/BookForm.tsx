import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Button, Modal } from "react-bootstrap";
import { Formik, FormikProps, FormikErrors } from "formik";

import { Book } from "./ourtypes";

const BookForm: React.FC<FormikProps<Book>> = ({
  handleSubmit,
  handleChange,
  values,
  touched,
  errors,
}) => {
  return (
    <Form noValidate onSubmit={handleSubmit}>
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
            isInvalid={touched.title && !!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Col>
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
            isInvalid={touched.author && !!errors.author}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author}
          </Form.Control.Feedback>
        </Col>
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
            isInvalid={!!errors.isbn}
          />
          <Form.Control.Feedback type="invalid">
            {errors.isbn}
          </Form.Control.Feedback>
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
        <Col sm={2}></Col>
        <Form.Check
          type="switch"
          label="Private"
          name="private"
          value={values.private.toString()}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Row>
        <Col sm={2}>
          <Button type="submit">Save</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

interface BookFormProps {
  book: Book;
  updateBookList: (book: Book) => void;
  updateDatabase: (book: Book) => void;
  closeModal: () => void;
}

const BookFormik: React.FC<BookFormProps> = ({
  book,
  updateBookList,
  updateDatabase,
  closeModal,
}) => {
  return (
    <Formik
      validate={(values: Book) => {
        let errors: FormikErrors<Book> = {};
        if (!values.title) {
          errors.title = "The book must have a title.";
        }
        if (!values.author) {
          errors.author = "The book must have an author.";
        }
        return errors;
      }}
      initialValues={book}
      onSubmit={(values: Book) => {
        updateDatabase(values);
        updateBookList(values);
        closeModal();
      }}
      component={BookForm}
    ></Formik>
  );
};

export default BookFormik;
