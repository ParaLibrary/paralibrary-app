import React, { useCallback } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { Formik, FormikProps, FormikErrors } from "formik";
import CreatableSelect from "react-select/creatable";

import { Book, Option } from "./ourtypes";

interface ExtraProps {
  allCategories: string[];
}

const BookForm: React.FC<FormikProps<Book> & ExtraProps> = ({
  handleSubmit,
  handleChange,
  values,
  touched,
  errors,
  allCategories,
  getFieldHelpers,
}) => {
  const mapToOptions = useCallback(
    (categories: string[]): Option[] =>
      categories.map((value) => {
        return { label: value, value };
      }),
    []
  );

  const mapToCategories = useCallback(
    (options: Option[] | null): string[] =>
      !options ? [] : options.map((opt) => opt.value),
    []
  );

  const { setValue } = getFieldHelpers("categories");
  const handleCreatableChange = useCallback(
    (newValue) => {
      setValue(mapToCategories(newValue));
    },
    [setValue, mapToCategories]
  );

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
      <Form.Group as={Form.Row} controlId="categories">
        <Form.Label column sm={2}>
          Tags:
        </Form.Label>
        <Col sm={10}>
          <CreatableSelect
            defaultValue={mapToOptions(values.categories)}
            options={mapToOptions(allCategories)}
            onChange={handleCreatableChange}
            isMulti
          />
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
        <Form.Label column sm={2}>
          Visibility
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            name="visibility"
            value={values.visibility}
            onChange={handleChange}
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </Form.Control>
        </Col>
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
  categoryOptions: string[];
  updateDatabase: (book: Book) => void;
  closeModal: () => void;
}

const BookFormik: React.FC<BookFormProps> = ({
  book,
  updateDatabase,
  closeModal,
  categoryOptions,
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
        closeModal();
      }}
      render={(props) => (
        <BookForm allCategories={categoryOptions} {...props} />
      )}
    ></Formik>
  );
};

export default BookFormik;
