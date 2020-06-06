import React from "react";
import styled from "styled-components";

import { Book, Loan } from "./ourtypes";
import { Role } from "./List";
import EditBookButton from "./libraryEditButton";
import LoanStatus from "./LoanStatus";
import LoanRequestButton from "./LoanRequestButton";
import { EyeClosedIcon, ShieldLockIcon } from "@primer/styled-octicons";

interface Extras {
  friendStatus: string | undefined;
  onEdit: (book: Book | undefined) => void;
  onRequest: (bookID: string) => void;
  onCancel: (loan: Loan) => void;
  onDelete: (book: Book | undefined) => void;
}

const BookCard: React.FC<Book & Role & Extras> = (bookAndRole) => {
  const {
    title,
    author,
    categories,
    summary,
    userRole,
    visibility,
    onEdit: handleEdit,
    onRequest: handleRequest,
    onCancel: handleCancel,
    onDelete: handleDelete,
    friendStatus,
  } = bookAndRole;
  return (
    <BookDiv>
      <Main>
        <NBM>
          <h4>{title}</h4>
          <h6>{author}</h6>
        </NBM>
        {userRole === "owner" ? (
          <ActionPanel>
            <LoanStatus />
            <EditBookButton
              onEdit={handleEdit}
              onDelete={handleDelete}
              rowitem={bookAndRole}
            />
          </ActionPanel>
        ) : (
          <ActionPanel hideActionsOnSmall={friendStatus !== "friends"}>
            {friendStatus === "friends" ? (
              <LoanRequestButton
                rowitem={bookAndRole}
                onRequest={handleRequest}
                onCancel={handleCancel}
              />
            ) : (
              <span>Become friends to request a loan!</span>
            )}
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
      {(categories.length > 0 || visibility !== "public") && (
        <>
          <div>
            <Line />
          </div>
          <TagList>
            {visibility === "private" && (
              <Tag highlight>
                <EyeClosedIcon color="white" />
              </Tag>
            )}
            {visibility === "friends" && (
              <Tag highlight>
                <ShieldLockIcon color="white" />
              </Tag>
            )}
            {categories.map((cat: string) => (
              <Tag key={cat}>{cat}</Tag>
            ))}
          </TagList>
        </>
      )}
    </BookDiv>
  );
};

const BookDiv = styled.div`
  background: white;
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

const Main = styled.div<{ hideActionsOnSmall?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto max(25%, 90px);
  @media screen and (min-width: ${({ theme }) => theme.smallViewport}) {
    display: auto;
  }
  gap: 0px 16px;
`;

const ActionPanel = styled.div<{ hideActionsOnSmall?: boolean }>`
  display: ${({ hideActionsOnSmall: hide }) => (!hide ? "flex" : "none")};
  @media screen and (min-width: ${({ theme }) => theme.smallViewport}) {
    display: flex;
  }
  flex-flow: column nowrap;
  justify-content: start;
  align-items: stretch;
  > :not(:last-child) {
    margin: 0px 0px 4px 0px;
  }
`;

const NBM = styled.div`
  > :last-child {
    margin-bottom: 0px;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
`;

const Tag = styled.span<{ highlight?: boolean }>`
  background-color: ${({ highlight }) =>
    !highlight ? "hsl(0, 0%, 90%)" : "#007bff"};
  border-radius: 2px;
  box-sizing: border-box;
  padding: 2px 8px 2px 8px;
  margin-right: 12px;
  margin-bottom: 4px;
`;

const Line = styled.hr`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

export default BookCard;
