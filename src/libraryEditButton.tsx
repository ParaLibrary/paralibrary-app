import React from "react";
import { Button } from "react-bootstrap";
import { Book } from "./ourtypes";
interface EditBookProps {
  rowitem?: Book;
  onEdit: (book: Book | undefined) => void;
}

const BookEditButton: React.FC<EditBookProps> = ({ rowitem, onEdit }) => {
  return (
    <Button
      onClick={() => {
        onEdit(rowitem);
      }}
    >
      Edit
    </Button>
  );
};
export default BookEditButton;
