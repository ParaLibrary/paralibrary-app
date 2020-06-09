import React, { useMemo } from "react";
import styled from "styled-components";

import { Loan, User, Book, LoanStatus } from "./ourtypes";
import { Role } from "./List";
import { OwnerLoanManager, RequesterLoanManager } from "./LoanManagers";
import UserDisplay from "./UserDisplay";
import BookDisplay from "./BookDisplay";
import useRefreshedTime from "./useRefreshedTime";

const LoanDiv = styled.div<{ late?: boolean }>`
  background: white;
  border: 0.1rem solid ${({ late }) => (!!late ? "#dc3545" : "#ececec")};
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px;
  max-width: 640px;
  align-items: baseline;

  display: grid;
  grid-template: auto auto / auto;
  gap: 0px 1rem;

  margin-bottom: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.smallViewport}) {
    grid-template: auto / auto max(33%, 120px);
    > p {
      margin: 0px;
    }
  }
`;

const LoanDisplay: React.FC<Loan & Role> = (loanAndRole) => {
  const { owner, requester, book, status, userRole: controller } = loanAndRole;
  const relevantDate = useMemo(() => {
    switch (status) {
      case "pending":
        return loanAndRole.request_date;
      case "accepted":
        return loanAndRole.accept_date;
      case "loaned":
        return loanAndRole.loan_start_date;
      default:
        return undefined;
    }
  }, [status, loanAndRole]);
  return (
    <LoanDiv>
      {controller === "owner" ? (
        <OwnerStatusMessage
          subject={requester}
          object={book}
          status={status}
          date={relevantDate}
        />
      ) : (
        <RequesterStatusMessage
          subject={owner}
          object={book}
          status={status}
          date={relevantDate}
        />
      )}
      {controller === "owner" ? (
        <OwnerLoanManager loan={loanAndRole} />
      ) : (
        <RequesterLoanManager loan={loanAndRole} />
      )}
    </LoanDiv>
  );
};

interface StatusMessageProps {
  subject: User;
  object?: Book;
  status: LoanStatus;
  date?: Date;
}

const OwnerStatusMessage: React.FC<StatusMessageProps> = ({
  subject,
  object,
  status,
  date,
}) => {
  const timeSince = useRefreshedTime();
  if (status === "pending") {
    return (
      <p>
        <UserDisplay data={subject} />
        <span> asked to borrow </span>
        <BookDisplay data={object} />
        <span>{date && timeSince(date)}</span>
      </p>
    );
  } else if (status === "accepted") {
    return (
      <p>
        <UserDisplay data={subject} />
        <span> is waiting to pick up </span>
        <BookDisplay data={object} />
      </p>
    );
  } else if (status === "loaned") {
    return (
      <p>
        <UserDisplay data={subject} />
        <span> borrowed </span>
        <BookDisplay data={object} />
        <span>{date && timeSince(date)}</span>
      </p>
    );
  } else if (status === "returned") {
    return (
      <p>
        <UserDisplay data={subject} />
        <span> returned </span>
        <BookDisplay data={object} />
      </p>
    );
  } else {
    return <span>Error: Undefined Status on loan</span>;
  }
};

const RequesterStatusMessage: React.FC<StatusMessageProps> = ({
  subject,
  object,
  status,
  date,
}) => {
  const timeSince = useRefreshedTime();
  if (status === "pending") {
    return (
      <p>
        <span>You requested </span>
        <BookDisplay data={object} />
        <span> from </span>
        <UserDisplay data={subject} />
        <span>{date && timeSince(date)}</span>
      </p>
    );
  } else if (status === "accepted") {
    return (
      <p>
        <span>Request for </span>
        <BookDisplay data={object} />
        <span> accepted by </span>
        <UserDisplay data={subject} />
        <span>{date && timeSince(date)}</span>
      </p>
    );
  } else if (status === "loaned") {
    return (
      <p>
        <span>You borrowed </span>
        <BookDisplay data={object} />
        <span> from </span>
        <UserDisplay data={subject} />
        <span>{date && timeSince(date)}</span>
      </p>
    );
  } else if (status === "returned") {
    return (
      <p>
        <span>You returned </span>
        <BookDisplay data={object} />
        <span> to </span>
        <UserDisplay data={subject} />
      </p>
    );
  } else {
    return <p>Error: Undefined Status on loan</p>;
  }
};

export default LoanDisplay;
