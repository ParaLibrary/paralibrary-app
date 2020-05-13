import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "./ourtypes";
import styled from "styled-components";
import AutoSuggest, {
  InputProps,
  OnSuggestionSelected,
  SuggestionsFetchRequested,
} from "react-autosuggest";

const OverflowDiv = styled.div`
  overflow: visible;
  height: 120px;
  position: sticky;
  z-index: 1;

  .react-autosuggest__container {
  }

  .react-autosuggest__input {
    width: 100%;
    height: 35px;
    padding: 10px 20px;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border: 1px solid #aaa;
    border-radius: 4px;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 75px;
    width: 100%;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`;

const FriendSearchBar = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState(Array<User>());
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSuggestionsFetchRequested: SuggestionsFetchRequested = ({
    value,
  }) => {
    setValue(value);
    fetchUsers(value);
  };

  function fetchUsers(searchTerm: string) {
    setLoading(true);

    fetch(`http://paralibrary.digital/api/users/${searchTerm}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        setSuggestions(json);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }

  function onSuggestionsClearRequested() {
    setSuggestions([]);
  }

  const onSuggestionSelected: OnSuggestionSelected<User> = (
    event,
    { suggestion }
  ) => {
    history.push(`/library/${suggestion.id}`);
  };

  function deserializeUser(user: User) {
    return user.name;
  }

  function renderSuggestion(user: User) {
    return <span>{user.name}</span>;
  }

  const inputProps: InputProps<User> = {
    placeholder: "Enter Name",
    value: value,
    onChange: (event, { newValue, method }) => {
      setValue(newValue);
    },
  };

  return (
    <OverflowDiv>
      <h3>Find New Friends</h3>
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={deserializeUser}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
      />
    </OverflowDiv>
  );
};

export default FriendSearchBar;
