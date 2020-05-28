import React, { useContext, useState } from "react";
import styled from "styled-components";
import Toast, { ToastProps } from "./Toast";

const ToastContainer = styled.div`
  position: fixed;
  padding: 20px;
  width: 100%;
  z-index: 2;
  bottom: 0;

  @media screen and (min-width: 480px) {
    width: 350px;
    right: 0;
  }
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
    setToasts([...toasts, newToast]);
  };

  return (
    <ToastContext.Provider value={{ add: addToast }}>
      {children}
      <ToastContainer>
        {toasts.map((t, index) => (
          <Toast key={index} {...t}></Toast>
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
