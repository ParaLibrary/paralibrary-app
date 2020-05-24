import React, { useState } from "react";
import styled from "styled-components";
import BootstrapToast from "react-bootstrap/Toast";

export interface ToastProps {
  header: string;
  body: string;
  type?: ToastType;
}

type ToastType = "default" | "error";

const hideDelay = 4000;

const ToastComponent = ({ header, body, type }: ToastProps) => {
  const [show, setShow] = useState(true);

  switch (type) {
    case "error":
      return (
        <Error
          onClose={() => setShow(false)}
          show={show}
          delay={hideDelay}
          autohide
        >
          <InnerToast header={header} body={body} />
        </Error>
      );
    default:
      return (
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={hideDelay}
          autohide
        >
          <InnerToast header={header} body={body} />
        </Toast>
      );
  }
};

const InnerToast: React.FC<ToastProps> = ({ header, body }) => {
  return (
    <>
      <BootstrapToast.Header>
        {false && (
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        )}
        <strong className="mr-auto">{header}</strong>
        {false && <small>Just now</small>}
      </BootstrapToast.Header>
      <BootstrapToast.Body>{body}</BootstrapToast.Body>
    </>
  );
};

const Toast = styled(BootstrapToast)`
  max-width: 480px;
`;

const Error = styled(Toast)`
  background-color: rgba(245, 125, 125, 0.85);
  color: white;

  .toast-header {
    background-color: rgba(245, 125, 125, 0.85);
    color: white;
  }
  .close {
    color: white;
    text-shadow: 0 1px 0 #000;
  }
`;

export default ToastComponent;
