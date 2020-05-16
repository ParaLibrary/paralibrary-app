import React, { useCallback, useContext } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";

import { LoanContext } from "./LoansPage";
import { Loan, LoanStatus } from "./ourtypes";
import ConfirmContext from "./ConfirmationContext";

type ButtonVariant = ButtonProps["variant"];

interface DeleteButtonProps {
  loan: Loan;
  variant?: ButtonVariant;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  loan: thisLoan,
  variant,
  children,
}) => {
  const { loans, setLoans } = useContext(LoanContext);
  const requestConfirmation = useContext(ConfirmContext);

  const handleClick = useCallback(() => {
    fetch(`http://paralibrary.digital/api/loans/${thisLoan.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setLoans(loans.filter((loan) => loan.id !== thisLoan.id));
        }
      })
      .catch((error) => console.log(error));
  }, [loans, thisLoan, setLoans]);

  return (
    <Button
      size="sm"
      onClick={() =>
        requestConfirmation(
          { body: "Are you sure you want to delete this?" },
          handleClick
        )
      }
      variant={variant}
    >
      {children}
    </Button>
  );
};

interface UpdateButtonProps {
  loan: Loan;
  variant?: ButtonVariant;
  status: LoanStatus;
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({
  loan: thisLoan,
  status: thisStatus,
  variant,
  children,
}) => {
  const { loans, setLoans } = useContext(LoanContext);

  const handleClick = useCallback(() => {
    const newLoan: Loan = { ...thisLoan, status: thisStatus };
    fetch(`http://paralibrary.digital/api/loans/${thisLoan.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLoan),
    })
      .then((res) => {
        if (res.ok) {
          setLoans(
            loans.map((loan) => (loan.id !== thisLoan.id ? loan : newLoan))
          );
        }
      })
      .catch((error) => console.log(error));
  }, [loans, thisLoan, setLoans, thisStatus]);
  return (
    <Button size="sm" onClick={handleClick} variant={variant}>
      {children}
    </Button>
  );
};

interface ContactButtonProps {
  loan: Loan;
  userType: "owner" | "requester";
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  loan,
  userType,
}) => {
  return (
    <Button
      size="sm"
      variant="info"
      href={`mailto:${
        userType === "owner" ? loan.owner_contact : loan.requester_contact
      }`}
    >
      Contact
    </Button>
  );
};
