import React from "react";

export interface Message {
  title?: string;
  body: string;
}

const ConfirmationContext = React.createContext<
  (message: Message, recall: VoidFunction) => void
>((message: Message, recall: VoidFunction) => {});

export default ConfirmationContext;
