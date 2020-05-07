import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { Formik, FormikProps, FormikErrors } from "formik";

import { LoanRequest } from "./ourtypes";

const LoanForm: React.FC<FormikProps<LoanRequest>> = ({
  handleSubmit,
  handleChange,
  values,
  touched,
  errors,
}) => {
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group as={Form.Row} controlId="contactInfo">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="requester_contact"
          value={values.requester_contact}
          onChange={handleChange}
          isInvalid={touched.requester_contact && !!errors.requester_contact}
        />
        <Form.Control.Feedback type="invalid">
          {errors.requester_contact}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Row>
        <Button type="submit">Save</Button>
      </Form.Row>
    </Form>
  );
};

interface LoanFormProps {
  loan: LoanRequest;
  updateDatabase: (book: LoanRequest) => void;
  closeModal: () => void;
}

const BookFormik: React.FC<LoanFormProps> = ({
  loan,
  updateDatabase,
  closeModal,
}) => {
  return (
    <Formik
      validate={(values: LoanRequest) => {
        let errors: FormikErrors<LoanRequest> = {};
        if (!values.requester_contact) {
          errors.requester_contact =
            "Must provide contact information for owner to reach you by.";
        }
        return errors;
      }}
      initialValues={loan}
      onSubmit={(values: LoanRequest) => {
        updateDatabase(values);
        closeModal();
      }}
      component={LoanForm}
    ></Formik>
  );
};

export default BookFormik;
