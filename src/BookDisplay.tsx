import React from "react";

import { Book } from "./ourtypes";

interface BookDisplayProps {
  data?: Book;
}

const BookDisplay: React.FC<BookDisplayProps> = ({ data }) => {
  return (
    <span>
      <em>{data?.title}</em>
    </span>
  );
};

export default BookDisplay;
