import React from "react";
import { Button } from "react-bootstrap";
import { Book } from "./ourtypes";
import { Dropdown } from "react-bootstrap";

interface DeleteBookProps {
  rowitem?: Book;
  onDelete: (book: Book | undefined) => void;
}

const LibraryDeleteButton: React.FC<DeleteBookProps> = ({ onDelete }) => {
  return (
    <Dropdown.Item
      onClick={() => {
        (rowitem: Book | undefined) => {
          if (rowitem) {
            onDelete(rowitem);
          }
        };
      }}
    >
      Delete
    </Dropdown.Item>
  );
};
export default LibraryDeleteButton;
