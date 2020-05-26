import React from "react";

export interface Message {
  title?: string;
  body: string;
}

const ConfirmationContext = React.createContext<
  (call: VoidFunction, message: Message) => void
>((call: VoidFunction, message: Message) => {});

export default ConfirmationContext;
