import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "./ourtypes";
import SearchStyleWrapper from "./SearchBarStyle";
import UserDisplay from "./UserDisplay";
import AutoSuggest, {
  InputProps,
  OnSuggestionSelected,
  SuggestionsFetchRequested,
} from "react-autosuggest";

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

    fetch(`http://localhost:8080/api/users/search/${searchTerm}`, {
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
    return <UserDisplay data={user} height={30} />;
  }

  const inputProps: InputProps<User> = {
    placeholder: "Enter Name",
    value: value,
    onChange: (event, { newValue, method }) => {
      setValue(newValue);
    },
  };

  return (
    <SearchStyleWrapper>
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
    </SearchStyleWrapper>
  );
};

export default FriendSearchBar;
