import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import {
  SearchIcon,
  FilterIcon,
  BookIcon,
  PlusIcon,
} from "@primer/octicons-v2-react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";

import { Option } from "./ourtypes";

interface ToolBarProps {
  onSearchChange: (searchTerm: string) => void;
  options: string[];
  setCategory: (option: Option) => void;
}

const LibraryToolBar: React.FC<ToolBarProps> = ({
  onSearchChange,
  setCategory,
  options,
}) => {
  return (
    <>
      <InputGroup size="sm" style={{ flexFlow: "wrap" }}>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <SearchIcon />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control placeholder="Search..." type="text" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <FilterIcon />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control as="select">
          <option></option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Form.Control>
        <InputGroup.Append>
          <Button>
            <BookIcon />
            <PlusIcon />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};

export default LibraryToolBar;
