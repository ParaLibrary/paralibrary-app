import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { Book, Loan } from "./ourtypes";
import { Role } from "./List";
import EditBookButton from "./libraryEditButton";
import LoanStatus from "./LoanStatus";
import LoanRequestButton from "./LoanRequestButton";

interface Actions {
  onEdit: (book: Book | undefined) => void;
  onRequest: (bookID: string) => void;
  onCancel: (loan: Loan) => void;
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
    onRequest: handleRequest,
    onCancel: handleCancel,
  } = bookAndRole;
  const [openSummary, setOpenSummary] = useState<boolean>(false);
  const toggleSummary = useCallback(() => {
    setOpenSummary(!openSummary);
  }, [openSummary]);

  return (
    <BookDiv>
      <Main>
        <MBM>
          <h4>{title}</h4>
          <h6>{author}</h6>
        </MBM>
        {userRole === "owner" ? (
          <ActionPanel>
            <LoanStatus />
            <EditBookButton onEdit={handleEdit} rowitem={bookAndRole} />
          </ActionPanel>
        ) : (
          <ActionPanel>
            <LoanRequestButton
              rowitem={bookAndRole}
              onRequest={handleRequest}
              onCancel={handleCancel}
            />
          </ActionPanel>
        )}
      </Main>

      {summary && (
        <>
          <div>
            <Line />
          </div>
          <p>{summary}</p>
        </>
      )}
      {categories.length > 0 && (
        <>
          <div>
            <Line />
          </div>
          <TagList>
            {categories.map((cat: string) => (
              <Tag>{cat}</Tag>
            ))}
          </TagList>
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
  > p {
    margin-bottom: 0px;
  }
`;

const Main = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto max(25%, 90px);
  gap: 0px 16px;
`;

const ActionPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: stretch;
  > :not(:last-child) {
    margin: 0px 0px 4px 0px;
  }
  > button {
    white-space: nowrap;
  }
`;

const MBM = styled.div`
  > :last-child {
    margin-bottom: 0px;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
`;

const Tag = styled.span`
  background-color: hsl(0, 0%, 90%);
  border-radius: 2px;
  box-sizing: border-box;
  padding: 2px 8px 2px 8px;
  margin-right: 12px;
`;

const Line = styled.hr`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

export default BookCard;
