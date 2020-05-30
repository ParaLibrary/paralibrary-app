import React from "react";
import { Button } from "react-bootstrap";
import { Book } from "./ourtypes";
interface EditBookProps {
  rowitem?: Book;
  onEdit: (book: Book | undefined) => void;
}

const bookEditButton: React.FC<EditBookProps> = ({ rowitem, onEdit }) => {
  return (
    <Button
      size="sm"
      onClick={() => {
        onEdit(rowitem);
      }}
    >
      Edit
    </Button>
  );
};
export default bookEditButton;
