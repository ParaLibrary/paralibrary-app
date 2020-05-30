import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

import { Book } from "./ourtypes";
import { Role } from "./List";
import EditBookButton from "./libraryEditButton";

interface Actions {
  onEdit: (book: Book | undefined) => void;
  requestButton: React.ReactNode;
}

const BookCard: React.FC<Book & Role & Actions> = (bookAndRole) => {
  const {
    title,
    author,
    categories,
    summary,
    visibility,
    loan,
    userRole,
    onEdit: handleEdit,
  } = bookAndRole;
  const [openSummary, setOpenSummary] = useState(false);
  const toggleSummary = useCallback(() => {
    setOpenSummary(!openSummary);
  }, [openSummary]);

  return (
    <BookDiv>
      <Main>
        <h3>{title}</h3>
        <h5>{author}</h5>
        {userRole === "owner" ? (
          <ActionPanel>
            <EditBookButton onEdit={handleEdit} rowitem={bookAndRole} />
          </ActionPanel>
        ) : (
          <ActionPanel>owner</ActionPanel>
        )}
      </Main>
      {categories.length > 0 && (
        <>
          <hr />
          <TagList>
            {categories.map((cat: string) => (
              <Tag>{cat}</Tag>
            ))}
          </TagList>
        </>
      )}
      {summary && (
        <>
          <Button onClick={toggleSummary}>VVV</Button>
          <Collapse in={openSummary}>
            <>
              <hr />
              <p>{summary}</p>
            </>
          </Collapse>
        </>
      )}
    </BookDiv>
  );
};

const BookDiv = styled.div`
  border: 0.1rem solid #ececec;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px;
  max-width: 640px;
  display: flex;
  flex-flow: column nowrap;
`;

const Main = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto max(25%, 120px);
  grid-template-areas:
    "title actions"
    "subtitle actions";
  gap: 0px 1rem;
`;

const ActionPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  justify-content: space-between;
  align-items: stretch;
  > :not(:last-child) {
    margin: 0px 0px 4px 0px;
  }
  > button {
    white-space: nowrap;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
`;

const Tag = styled.span``;

export default BookCard;
