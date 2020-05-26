import React, { useState, useContext, useEffect, useCallback } from "react";
import { useFormik, FormikErrors } from "formik";
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
  const [user, setUser] = useState<User>({ id: "", name: "", status: null });
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
          <h5>Delete Account</h5>
          <Form.Text>Type name to reveal permanent delete option.</Form.Text>
          <Form.Group as={Form.Row} controlId="signature">
            <Form.Label column sm={2}>
              Name:
            </Form.Label>
            <Col>
              <Form.Control type="text" name="sig" onChange={handleSigChange} />
            </Col>
            <Col sm={4}>
              <DeleteAccountButton
                user={user}
                signature={sig}
                isLoaded={isLoaded}
              />
            </Col>
          </Form.Group>
        </Form>
      }
    >
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
