import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { AuthContext } from "./AuthContextProvider";
import { Book, Loan } from "./ourtypes";

interface LRBProps {
  rowItem?: Book;
  onRequest: (bookID: string) => void;
  onCancel: (loan: Loan) => void;
}

const LoanRequestButton: React.FC<LRBProps> = ({
  rowItem: book,
  onRequest: requestLoan,
  onCancel: cancelLoan,
}) => {
  if (!book) {
    throw new Error("Row lacks valid data");
  }
  const auth = useContext(AuthContext);
  const userID = auth.credential.userId;
  const existingLoan = book.loan;

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
    return <Button onClick={() => requestLoan(book.id)}>Request Book</Button>;
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
