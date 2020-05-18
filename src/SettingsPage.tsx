import React, { useState, useContext, useEffect, useCallback } from "react";
import { useFormik, FormikErrors, Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";

import PageLayout from "./PageLayout";
import { AuthContext } from "./AuthContextProvider";
import { User } from "./ourtypes";
import { toUser } from "./mappers";

interface SettingsValues {
  name: string;
}

const SettingsPage: React.FC = () => {
  const { credential } = useContext(AuthContext);
  const [user, setUser] = useState<User>({ id: "", name: "", status: null });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch(`http://paralibrary.digital/api/users/${credential.userId}`, {
      credentials: "include",
    })
      .then((res: Response) => res.json())
      .then(
        (body: any) => {
          setUser(toUser(body));
        },
        (error: any) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  const onSubmit = useCallback((values: User) => {
    fetch(`http://paralibrary.digital/api/users/${user.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res: Response) => res.json())
      .then((body: any) => {
        setUser(toUser(body));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const validate = useCallback((values: User) => {
    let errors: FormikErrors<User> = {};
    if (!values.name) {
      errors.name = "Must have a name.";
    }
    return errors;
  }, []);

  const userFormik = useFormik<User>({
    initialValues: { ...user },
    validate,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <PageLayout header={<h1>My Settings</h1>}>
      <Form noValidate onSubmit={userFormik.handleSubmit}>
        <Form.Group as={Form.Row} controlId="name">
          <Form.Label column sm={2}>
            Name:
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="name"
              value={userFormik.values.name}
              onChange={userFormik.handleChange}
              isInvalid={userFormik.touched.name && !!userFormik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {userFormik.errors.name}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Collapse in={userFormik.dirty}>
          <Form.Row>
            <Col />
            <Col sm={2}>
              <Button type="submit">Save</Button>
            </Col>
          </Form.Row>
        </Collapse>
      </Form>
    </PageLayout>
  );
};

export default SettingsPage;
