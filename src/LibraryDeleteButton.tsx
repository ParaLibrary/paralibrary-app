import React from "react";
import { Button } from "react-bootstrap";
import { Book } from "./ourtypes";

interface DeleteBookProps {
  rowitem?: Book;
  onDelete: (book: Book | undefined) => void;
}

const LibraryDeleteButton: React.FC<DeleteBookProps> = ({
  rowitem,
  onDelete,
}) => {
  return (
    <Button
      onClick={() => {
        onDelete(rowitem);
      }}
    >
      Delete
    </Button>
  );
};
export default LibraryDeleteButton;
