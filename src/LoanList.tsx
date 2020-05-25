import React from "react";
import styled from "styled-components";
import Fade from "react-reveal";
import TransitionGroup from "react-transition-group/TransitionGroup";

import { Loan, User, Book, LoanStatus } from "./ourtypes";
import { OwnerLoanManager, RequesterLoanManager } from "./LoanManagers";
import UserDisplay from "./UserDisplay";
import BookDisplay from "./BookDisplay";

const SegTransitionGroup = styled(TransitionGroup)`
  > div {
    margin-bottom: 0.5rem;
  }
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
  if (loans.length === 0) {
    return !!title && !!placeholder ? (
      <>
        {title} {placeholder}
      </>
    ) : null;
  } else {
    return (
      <>
        {title}
        <SegTransitionGroup appear enter exit>
          {loans.map((loan) => (
            <Fade key={loan.id} collapse bottom>
              <LoanDisplay loan={loan} controller={userRole} />
            </Fade>
          ))}
        </SegTransitionGroup>
      </>
    );
  }
};

export default LoanList;

const LoanDiv = styled.div<{ late?: boolean }>`
  border: 0.1rem solid #ececec;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px;
  max-width: 640px;
  align-items: baseline;

  display: grid;
  grid-template: auto auto / auto;
  gap: 0px 1rem;

  @media screen and (min-width: 480px) {
    grid-template: auto / auto 100px;
    > p {
      margin: 0px;
    }
  }
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
      <p>
        <UserDisplay data={subject} />
        <span> wants to borrow </span>
        <BookDisplay data={object} />
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
}) => {
  if (status === "pending") {
    return (
      <p>
        <span>You requested </span>
        <BookDisplay data={object} />
        <span> from </span>
        <UserDisplay data={subject} />
      </p>
    );
  } else if (status === "accepted") {
    return (
      <p>
        <span>Request for </span>
        <BookDisplay data={object} />
        <span> accepted by </span>
        <UserDisplay data={subject} />
      </p>
    );
  } else if (status === "loaned") {
    return (
      <p>
        <span>You borrowed </span>
        <BookDisplay data={object} />
        <span> from </span>
        <UserDisplay data={subject} />
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
