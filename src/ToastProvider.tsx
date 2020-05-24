import React, { useContext, useState } from "react";
import styled from "styled-components";
import BootstrapToast from "react-bootstrap/Toast";

const ToastContainer = styled.div`
  width: 350px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
`;

const DefaultToast = styled(BootstrapToast)`
  .toast {
    color: red;
  }
`;

interface ToastInterface {
  add(msg: ToastProps): void;
}

interface ToastProps {
  header: string;
  body: string;
  type?: ToastType;
}

type ToastType = "default" | "error";

export const ToastContext = React.createContext<ToastInterface>({
  add: () => {
    console.log("Default toast");
  },
});

const ToastContextProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (newToast: ToastProps) => {
    console.log("Added toast!");
    setToasts([...toasts, newToast]);
  };

  const value: ToastInterface = {
    add: addToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer>
        {toasts.map((t, index) => {
          switch (t.type) {
            case "error":
              return (
                <ToastComponent
                  key={index}
                  header={t.header}
                  body={t.body}
                ></ToastComponent>
              );
            default:
              return (
                <ToastComponent
                  key={index}
                  header={t.header}
                  body={t.body}
                ></ToastComponent>
              );
          }
        })}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

const ToastComponent = ({ header, body }: ToastProps) => {
  const [show, setShow] = useState(true);

  return (
    <BootstrapToast
      onClose={() => setShow(false)}
      show={show}
      delay={4500}
      autohide
    >
      <BootstrapToast.Header>
        {false && (
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        )}
        <strong className="mr-auto">{header}</strong>
        {false && <small>Just now</small>}
      </BootstrapToast.Header>
      <BootstrapToast.Body>{body}</BootstrapToast.Body>
    </BootstrapToast>
  );
};

export const useToasts = () => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw Error(
      "The `useToasts` hook must be called from a descendent of the `ToastProvider`."
    );
  }

  return {
    addToast: ctx.add,
  };
};

export default ToastContextProvider;
