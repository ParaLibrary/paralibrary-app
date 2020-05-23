import React from "react";
import styled from "styled-components";
import Fade from "react-reveal";
import TransitionGroup from "react-transition-group/TransitionGroup";

import { Loan, User, Book, LoanStatus } from "./ourtypes";
import { OwnerLoanManager, RequesterLoanManager } from "./LoanManagers";
import UserDisplay from "./UserDisplay";
import BookDisplay from "./BookDisplay";

const LoanListLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border-width: 0.2rem;
  border-radius: 8px;
  padding: 4px;
`;

interface LoanListProps {
  loans: Loan[];
  title?: React.ReactElement;
  placeholder?: React.ReactElement;
  userRole: "owner" | "requester";
}

const LoanList: React.FC<LoanListProps> = ({
  loans,
  placeholder,
  userRole,
  title,
}) => {
  if (loans.length === 0 && !placeholder) {
    return null;
  } else {
    return (
      <>
        {title}
        <LoanListLayout>
          <TransitionGroup>
            {loans.length === 0
              ? placeholder
              : loans.map((loan) => (
                  <Fade>
                    <LoanDisplay
                      key={loan.id}
                      loan={loan}
                      controller={userRole}
                    />
                  </Fade>
                ))}
          </TransitionGroup>
        </LoanListLayout>
      </>
    );
  }
};

export default LoanList;

const LoanDiv = styled.div<{ late?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  @media screen and (min-width: 480px) {
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  border: 0.1rem solid #ececec;
`;

interface LoanDisplayProps {
  loan: Loan;
  controller: "owner" | "requester";
}

const LoanDisplay: React.FC<LoanDisplayProps> = ({ loan, controller }) => {
  const { owner, requester, book, status } = loan;
  return (
    <LoanDiv>
      {controller === "owner" ? (
        <OwnerStatusMessage subject={requester} object={book} status={status} />
      ) : (
        <RequesterStatusMessage subject={owner} object={book} status={status} />
      )}
      {controller === "owner" ? (
        <OwnerLoanManager loan={loan} />
      ) : (
        <RequesterLoanManager loan={loan} />
      )}
    </LoanDiv>
  );
};

interface StatusMessageProps {
  subject: User;
  object?: Book;
  status: LoanStatus;
}

const OwnerStatusMessage: React.FC<StatusMessageProps> = ({
  subject,
  object,
  status,
}) => {
  if (status === "pending") {
    return (
      <>
        <UserDisplay data={subject} />
        <span> wants to borrow </span>
        <BookDisplay data={object} />
      </>
    );
  } else if (status === "accepted") {
    return (
      <>
        <UserDisplay data={subject} />
        <span> is waiting to pick up </span>
        <BookDisplay data={object} />
      </>
    );
  } else if (status === "loaned") {
    return (
      <>
        <UserDisplay data={subject} />
        <span> borrowed </span>
        <BookDisplay data={object} />
      </>
    );
  } else if (status === "returned") {
    return (
      <>
        <UserDisplay data={subject} />
        <span> returned </span>
        <BookDisplay data={object} />
      </>
    );
  } else {
    return <span>Error: Undefined Status on loan</span>;
  }
};

const RequesterStatusMessage: React.FC<StatusMessageProps> = ({
  subject,
  object,
  status,
}) => {
  if (status === "pending") {
    return (
      <>
        <span>You requested</span>
        <BookDisplay data={object} />
        <span> from </span>
        <UserDisplay data={subject} />
      </>
    );
  } else if (status === "accepted") {
    return (
      <>
        <span>Request for</span>
        <BookDisplay data={object} />
        <span> accepted by </span>
        <UserDisplay data={subject} />
      </>
    );
  } else if (status === "loaned") {
    return (
      <>
        <span>You borrowed </span>
        <BookDisplay data={object} />
        <span> from </span>
        <UserDisplay data={subject} />
      </>
    );
  } else if (status === "returned") {
    return (
      <>
        <span>You returned </span>
        <BookDisplay data={object} />
        <span> to </span>
        <UserDisplay data={subject} />
      </>
    );
  } else {
    return <span>Error: Undefined Status on loan</span>;
  }
};
