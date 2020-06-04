import React from "react";
import { Button } from "react-bootstrap";
import { Book } from "./ourtypes";
import { Dropdown } from "react-bootstrap";

interface DeleteBookProps {
  rowitem?: Book;
  onDelete: (book: Book | undefined) => void;
}

const LibraryDeleteButton: React.FC<DeleteBookProps> = ({
  rowitem,
  onDelete,
}) => {
  return (
    <Dropdown.Item
      onClick={() => {
        onDelete(rowitem);
      }}
    >
      Delete
    </Dropdown.Item>
  );
};
export default LibraryDeleteButton;
