import React, { useState, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Loan } from "./ourtypes";

interface LRBProps {
  id: number;
  userID: number;
  loans: Loan[];
  requestLoan?: () => Promise<boolean>;
  cancelLoan?: () => Promise<boolean>;
}

const LoanRequestButton: React.FC<LRBProps> = ({
  id: bookID,
  userID, //probably use authentication context when that's up instead
  loans,
  requestLoan,
  cancelLoan,
}) => {
  const existingLoan = useMemo(
    () => loans.find((value: Loan) => value.book_id === bookID),
    [bookID, loans]
  );
  const [isDisabled, setIsDisabled] = useState(false);

  const handleRequest = useCallback(async () => {
    setIsDisabled(true);
    const success = !!requestLoan && (await requestLoan());
    if (!success) {
      setIsDisabled(false);
    }
  }, [requestLoan]);

  const handleCancel = useCallback(async () => {
    setIsDisabled(true);
    const success = !!cancelLoan && (await cancelLoan());
    if (!success) {
      setIsDisabled(false);
    }
  }, [cancelLoan]);

  const history = useHistory();

  const handleNavigate = () => {
    history.push("/loans");
  };

  if (!existingLoan || existingLoan.status === "returned") {
    return (
      <Button disabled={isDisabled} onClick={handleRequest}>
        Request Book
      </Button>
    );
  } else if (
    existingLoan.status === "pending" ||
    existingLoan.status === "accepted"
  ) {
    return (
      <Button
        variant="outline-danger"
        disabled={isDisabled}
        onClick={handleCancel}
      >
        Cancel?
      </Button>
    );
  } else {
    if (existingLoan.requester_id === userID) {
      return (
        <Button variant="outline-success" onClick={handleNavigate}>
          Loaned Out
        </Button>
      );
    } else {
      return (
        <Button variant="outline-info" disabled>
          Loaned Out
        </Button>
      );
    }
  }
};

export default LoanRequestButton;
