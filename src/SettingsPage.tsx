import React, { useState, useContext, useEffect, useCallback } from "react";
import { useFormik, FormikErrors, Field } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";

import PageLayout from "./PageLayout";
import { AuthContext } from "./AuthContextProvider";
import { User } from "./ourtypes";
import { toUser } from "./mappers";
import DeleteAccountButton from "./DeleteAccountButton";
import { useToasts } from "./ToastProvider";

const SettingsPage: React.FC = () => {
  const { credential } = useContext(AuthContext);
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    status: null,
    picture: "",
    email: "",
  });
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sig, setSig] = useState("");
  const { addToast } = useToasts();

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
          setError(true);
        }
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [credential]);

  const onSubmit = useCallback(
    (values: User) => {
      fetch(`http://paralibrary.digital/api/users/${values.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res: Response) => {
          console.log(values);
          if (res.ok) {
            setUser(values);
            addToast({
              header: "Profile Updated!",
              body: "Settings saved",
              type: "success",
            });
          } else {
            throw Error();
          }
        })
        .catch((error) => {
          console.log(error);
          addToast({
            header: "Could not update profile",
            body: "Something went wrong. Please try again in a few moments",
            type: "error",
          });
        });
    },
    [addToast]
  );

  const validate = useCallback((values: User) => {
    let errors: FormikErrors<User> = {};
    if (!values.name) {
      errors.name = "Must have a name";
    }
    if (values.email.length > 0 && !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Please enter a valid email";
    }
    return errors;
  }, []);

  const userFormik = useFormik<User>({
    initialValues: { ...user },
    validate,
    onSubmit,
    enableReinitialize: true,
  });

  const handleSigChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSig(event.target.value);
    },
    []
  );

  return (
    <PageLayout
      header={<h1>My Settings</h1>}
      error={error}
      loaded={isLoaded}
      footer={
        <Form>
          <h3>Delete Account</h3>
          <Form.Text>Type name to reveal permanent delete option.</Form.Text>
          <Form.Group as={Form.Row} controlId="signature">
            <Form.Label column sm={2}>
              Name:
            </Form.Label>
            <Form.Control type="text" name="sig" onChange={handleSigChange} />
            <Form.Row>
              <DeleteAccountButton
                user={user}
                signature={sig}
                isLoaded={isLoaded}
              />
            </Form.Row>
          </Form.Group>
        </Form>
      }
    >
      <Form noValidate onSubmit={userFormik.handleSubmit}>
        <h3>Account Details</h3>
        <Form.Group as={Form.Row} controlId="name">
          <Form.Label>Name:</Form.Label>
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
        </Form.Group>
        <Form.Group as={Form.Row} controlId="email">
          <Form.Label>Public Contact Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userFormik.values.email}
            onChange={userFormik.handleChange}
            isInvalid={userFormik.touched.email && !!userFormik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {userFormik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Collapse in={userFormik.dirty}>
          <Form.Row>
            <Button type="submit">Save</Button>
          </Form.Row>
        </Collapse>
      </Form>
    </PageLayout>
  );
};

export default SettingsPage;
