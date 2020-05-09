import React, { useMemo, useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { AuthContext } from "./AuthContextProvider";
import { Book, Loan } from "./ourtypes";

interface LRBProps {
  id: string;
  books: Book[];
  onRequest: (bookID: string) => void;
  onCancel: (loan: Loan) => void;
}

const LoanRequestButton: React.FC<LRBProps> = ({
  id: bookID,
  books,
  onRequest: requestLoan,
  onCancel: cancelLoan,
}) => {
  const auth = useContext(AuthContext);
  const userID = auth.credential.userId;
  const existingLoan = useMemo(
    () => books.find((value: Book) => value.id === bookID)?.loan,
    [bookID, books]
  );
  auth.logout();

  const history = useHistory();

  const handleNavigate = () => {
    history.push("/loans");
  };

  if (
    !existingLoan ||
    existingLoan.status === "returned" ||
    (existingLoan.status === "pending" && existingLoan.requester_id !== userID)
  ) {
    return <Button onClick={() => requestLoan(bookID)}>Request Book</Button>;
  } else if (
    existingLoan.status === "pending" ||
    (existingLoan.status === "accepted" && existingLoan.requester_id === userID)
  ) {
    return (
      <Button variant="outline-danger" onClick={() => cancelLoan(existingLoan)}>
        Cancel?
      </Button>
    );
  } else {
    if (existingLoan.requester_id === auth.credential.userId) {
      return (
        <Button variant="success" onClick={handleNavigate}>
          Loaned Out
        </Button>
      );
    } else {
      return (
        <Button variant="info" disabled>
          Loaned Out
        </Button>
      );
    }
  }
};

export default LoanRequestButton;
