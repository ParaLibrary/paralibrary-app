import React, { useContext, useState } from "react";
import styled from "styled-components";
import Toast, { ToastProps } from "./Toast";

const ToastContainer = styled.div`
  padding: 20px;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;

  @media screen and (min-width: ${({ theme }) => theme.smallViewport}) {
    position: fixed;
    left: auto;
    width: 350px;
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
