import React from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { Book } from "./ourtypes";
import styled from "styled-components";

const DangerDropdownItem = styled(Dropdown.Item)`
  background-color: red;
`;
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
      <Button onClick={() => onEdit(rowitem)} block>
        Edit
      </Button>

      <Dropdown.Toggle split id="dropdown-split-basic" />

      <Dropdown.Menu>
        <DangerDropdownItem variant="danger" onClick={() => onDelete(rowitem)}>
          Delete
        </DangerDropdownItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default BookEditButton;
