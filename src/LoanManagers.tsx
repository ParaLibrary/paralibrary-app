import React from "react";
import styled from "styled-components";

import { Loan } from "./ourtypes";
import {
  DeleteButton,
  ContactButton,
  UpdateButton,
} from "./LoanManagementButtons";

interface LMProps {
  rowitem?: Loan;
}

const ActionPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > :not(:last-child) {
    margin: 0px 0px 4px 0px;
  }
  > button {
    white-space: nowrap;
  }
`;

export const OwnerLoanManager: React.FC<LMProps> = ({ rowitem: loan }) => {
  if (!loan) {
    throw new Error("Row lacks valid data");
  }

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
        <ContactButton loan={loan} userType="requester" />
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

export const RequesterLoanManager: React.FC<LMProps> = ({ rowitem: loan }) => {
  if (!loan) {
    throw new Error("Row lacks valid data");
  }

  return (
    <ActionPanel>
      {loan.status === "accepted" && !!loan.owner_contact && (
        <ContactButton loan={loan} userType="owner" />
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
