import React from "react";
import styled from "styled-components";

import { Loan } from "./ourtypes";
import {
  DeleteButton,
  ContactButton,
  UpdateButton,
} from "./LoanManagementButtons";

interface LMProps {
  loan: Loan;
}

const ActionPanel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  @media screen and (min-width: 480px) {
    flex-flow: column nowrap;
    justify-content: center;
    > :not(:last-child) {
      margin: 0px 0px 4px 0px;
    }
    > button {
      white-space: nowrap;
    }
  }
`;

export const OwnerLoanManager: React.FC<LMProps> = ({ loan }) => {
  return (
    <ActionPanel>
      {loan.status === "pending" && (
        <UpdateButton variant="success" loan={loan} status="accepted">
          Accept
        </UpdateButton>
      )}
      {loan.status === "pending" && (
        <DeleteButton
          variant="outline-danger"
          loan={loan}
          gated
          message="Are you sure you want to decline this request?"
        >
          Decline
        </DeleteButton>
      )}
      {loan.status === "accepted" && (
        <ContactButton contact={loan.requester.email} />
      )}
      {loan.status === "loaned" && (
        <UpdateButton
          loan={loan}
          status="returned"
          gated
          message="Do you have this book in your possession?"
        >
          Book returned
        </UpdateButton>
      )}
    </ActionPanel>
  );
};

export const RequesterLoanManager: React.FC<LMProps> = ({ loan }) => {
  if (!loan) {
    throw new Error("Row lacks valid data");
  }

  return (
    <ActionPanel>
      {loan.status === "accepted" && (
        <ContactButton contact={loan.owner.email} />
      )}
      {loan.status === "accepted" && (
        <UpdateButton loan={loan} status="loaned">
          Book received
        </UpdateButton>
      )}
      {(loan.status === "pending" || loan.status === "accepted") && (
        <DeleteButton
          variant="outline-danger"
          loan={loan}
          gated
          message="Are you sure you want to cancel this request?"
        >
          Cancel
        </DeleteButton>
        // Maybe eventually this will become a transition to the declined state
      )}

      {loan.status === "returned" && (
        <DeleteButton variant="success" loan={loan}>
          Confirm
        </DeleteButton>
      )}
    </ActionPanel>
  );
};
