import React, { useState } from "react";
import { Book } from "./ourtypes";
import SearchStyleWrapper from "./SearchBarStyle";
import styled from "styled-components";
import AutoSuggest, { InputProps } from "react-autosuggest";
import escapeRegexp from "escape-string-regexp";

const NoDropdownSearch = styled(SearchStyleWrapper)`
  .react-autosuggest__suggestions-container--open {
    display: none;
  }
`;

interface LibrarySearchProps {
  onSearchChange: (searchTerm: string) => void;
  header: string;
}

const LibrarySearchBar: React.FC<LibrarySearchProps> = ({
  onSearchChange,
  header,
}) => {
  const [value, setValue] = useState("");

  function NoOp() {}

  function deserializeUser(book: Book) {
    return "";
  }

  function renderSuggestion(user: Book) {
    return <></>;
  }

  const inputProps: InputProps<Book> = {
    placeholder: "Enter Title or Author",
    value: value,
    onChange: (event, { newValue, method }) => {
      setValue(newValue);
      onSearchChange(escapeRegexp(newValue));
    },
  };

  return (
    <NoDropdownSearch>
      <h3>{header}</h3>
      <AutoSuggest
        suggestions={[]}
        onSuggestionsClearRequested={NoOp}
        onSuggestionsFetchRequested={NoOp}
        getSuggestionValue={deserializeUser}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
      />
    </NoDropdownSearch>
  );
};

export default LibrarySearchBar;
