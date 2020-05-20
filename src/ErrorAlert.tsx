import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import ErrorMessages from "./ErrorMessages.json";

export interface ErrorAlertProps {
  header?: string;
  message?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ header, message }) => {
  const [show, setShow] = useState(true);
  const [eMessageIdx] = useState(
    Math.floor(Math.random() * ErrorMessages.length)
  );

  if (!show) {
    return <></>;
  }

  return (
    <Alert variant="danger" dismissible onClose={() => setShow(false)}>
      <Alert.Heading>
        {header ? header : ErrorMessages[eMessageIdx].header}
      </Alert.Heading>
      {message ? (
        message
      ) : (
        <>
          {ErrorMessages[eMessageIdx].body}
          <hr />
          <p>Something went wrong! Try refreshing the page</p>
        </>
      )}
    </Alert>
  );
};

export default ErrorAlert;
