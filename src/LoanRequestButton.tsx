import React, { useState, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Book, Loan } from "./ourtypes";

interface LRBProps {
  id: number;
  userID: number;
  books: Book[];
  onRequest: (bookID: number) => Promise<boolean> | boolean;
  onCancel: (loan: Loan) => Promise<boolean> | boolean;
}

const LoanRequestButton: React.FC<LRBProps> = ({
  id: bookID,
  userID, //probably use authentication context when that's up instead
  books,
  onRequest: requestLoan,
  onCancel: cancelLoan,
}) => {
  const existingLoan = useMemo(
    () => books.find((value: Book) => value.id === bookID)?.loan,
    [bookID, books]
  );
  const [isDisabled, setIsDisabled] = useState(false);

  const handleRequest = useCallback(async () => {
    setIsDisabled(true);
    const success = requestLoan !== undefined && (await requestLoan(bookID));
    if (!success) {
      setIsDisabled(false);
    }
  }, [bookID, requestLoan]);

  const handleCancel = useCallback(async () => {
    setIsDisabled(true);
    const success = !!existingLoan && (await cancelLoan(existingLoan));
    if (!success) {
      setIsDisabled(false);
    }
  }, [existingLoan, cancelLoan]);

  const history = useHistory();

  const handleNavigate = () => {
    history.push("/loans");
  };

  if (
    !existingLoan ||
    existingLoan.status === "returned" ||
    (existingLoan.status === "pending" && existingLoan.requester_id !== userID)
  ) {
    return (
      <Button disabled={isDisabled} onClick={handleRequest}>
        Request Book
      </Button>
    );
  } else if (
    existingLoan.status === "pending" ||
    (existingLoan.status === "accepted" && existingLoan.requester_id === userID)
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
