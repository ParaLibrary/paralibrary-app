import React, { useContext, useState } from "react";
import styled from "styled-components";
import Toast, { ToastProps } from "./Toast";

const ToastContainer = styled.div`
  width: 350px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
`;

interface ToastInterface {
  add(msg: ToastProps): void;
}

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
        {toasts.map((t, index) => (
          <Toast
            key={index}
            header={t.header}
            body={t.body}
            type={t.type}
          ></Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
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
