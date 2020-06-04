import React from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { Book } from "./ourtypes";
interface EditBookProps {
  rowitem: Book;
  onEdit: (book: Book | undefined) => void;
  onDelete: (book: Book | undefined) => void;
}

const BookEditButton: React.FC<EditBookProps> = ({
  rowitem,
  onEdit,
  onDelete,
}) => {
  return (
    <Dropdown as={ButtonGroup}>
      <Button onClick={() => onEdit(rowitem)}>Edit</Button>

      <Dropdown.Toggle split id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onDelete(rowitem)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default BookEditButton;
