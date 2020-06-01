import React, { useCallback } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import {
  SearchIcon,
  FilterIcon,
  BookIcon,
  PlusIcon,
} from "@primer/octicons-v2-react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const ToolBar = styled.div`
  margin-bottom: 16px;
  > :not(:last-child) {
    margin-bottom: 8px;
  }
`;

interface ToolBarProps {
  onSearchChange: (searchTerm: string) => void;
  options: string[];
  onCategoryChange: (option: string) => void;
  onAddBook: () => void;
}

const LibraryToolBar: React.FC<ToolBarProps> = ({
  onSearchChange,
  onCategoryChange,
  options,
  onAddBook: handleAddBook,
}) => {
  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onCategoryChange(event.currentTarget.value);
    },
    [onCategoryChange]
  );
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.currentTarget.value);
    },
    [onSearchChange]
  );

  return (
    <ToolBar>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <SearchIcon />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          placeholder="Search..."
          type="text"
          onChange={handleSearch}
        />
      </InputGroup>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <FilterIcon />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control as="select" onChange={handleSelect}>
          <option label="No filter"></option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Form.Control>
      </InputGroup>
      <InputGroup>
        <Button onClick={handleAddBook}>
          <BookIcon />
          <PlusIcon />
        </Button>
      </InputGroup>
    </ToolBar>
  );
};

export default LibraryToolBar;
