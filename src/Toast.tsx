import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BootstrapToast from "react-bootstrap/Toast";

export interface ToastProps {
  header: string;
  body: string;
  type?: ToastType;
  time?: number;
}

type ToastType = "default" | "error" | "success";

const hideDelay = 2200;

const ToastComponent = ({ header, body, type, time }: ToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log(header);
    console.log(body);
    console.log(type);
    console.log(time);
  }, [time]);

  switch (type) {
    case "error":
      return (
        <Error
          onClose={() => setShow(false)}
          show={show}
          delay={time ?? hideDelay}
          autohide
        >
          <InnerToast header={header} body={body} />
        </Error>
      );
    case "success":
      return (
        <Success
          onClose={() => setShow(false)}
          show={show}
          delay={time ?? hideDelay}
          autohide
        >
          <InnerToast header={header} body={body} />
        </Success>
      );
    default:
      return (
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={time ?? hideDelay}
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

const DarkToast = styled(Toast)`
  color: white;
  background-color: rgba(30, 30, 30, 0.85);

  .toast-header {
    color: white;
    background-color: rgba(30, 30, 30, 0.85);
  }
  .close {
    color: white;
    text-shadow: 0 1px 0 #000;
  }
`;

const Error = styled(DarkToast)`
  background-color: rgba(245, 125, 125, 0.85);

  .toast-header {
    background-color: rgba(245, 125, 125, 0.85);
  }
`;

const Success = styled(DarkToast)`
  background-color: rgba(32, 150, 63, 0.85);

  .toast-header {
    background-color: rgba(32, 150, 63, 0.85);
  }
`;

export default ToastComponent;
