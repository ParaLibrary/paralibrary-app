import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { AuthContext } from "./AuthContextProvider";
import { Book, Loan } from "./ourtypes";

interface LRBProps {
  rowitem?: Book;
  onRequest: (bookID: string) => void;
  onCancel: (loan: Loan) => void;
}

const LoanRequestButton: React.FC<LRBProps> = ({
  rowitem: book,
  onRequest: requestLoan,
  onCancel: cancelLoan,
}) => {
  if (!book) {
    throw new Error("Row lacks valid data");
  }
  const auth = useContext(AuthContext);
  const userID = auth.credential.userId;
  const existingLoan = book.loan;

  const history = useHistory();

  const handleNavigate = () => {
    history.push("/loans");
  };

  if (
    !existingLoan ||
    existingLoan.status === "returned" ||
    (existingLoan.status === "pending" && existingLoan.requester.id !== userID)
  ) {
    return (
      <Button size="sm" onClick={() => requestLoan(book.id)}>
        Request Book
      </Button>
    );
  } else if (
    existingLoan.status === "pending" ||
    (existingLoan.status === "accepted" && existingLoan.requester.id === userID)
  ) {
    return (
      <Button
        size="sm"
        variant="outline-danger"
        onClick={() => cancelLoan(existingLoan)}
      >
        Cancel?
      </Button>
    );
  } else {
    if (existingLoan.requester.id === auth.credential.userId) {
      return (
        <Button size="sm" variant="success" onClick={handleNavigate}>
          Loaned Out
        </Button>
      );
    } else {
      return (
        <Button size="sm" variant="info" disabled>
          Loaned Out
        </Button>
      );
    }
  }
};

export default LoanRequestButton;
