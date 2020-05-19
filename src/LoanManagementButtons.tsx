import React, { useCallback, useContext } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";

import { LoanContext } from "./LoansPage";
import { Loan, LoanStatus } from "./ourtypes";
import ConfirmContext from "./ConfirmationContext";

type ButtonVariant = ButtonProps["variant"];

interface DeleteButtonProps {
  loan: Loan;
  variant?: ButtonVariant;
  gated?: boolean;
  message?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  loan: thisLoan,
  variant,
  children,
  gated,
  message,
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

  const gatedHandle = useCallback(
    () =>
      requestConfirmation(handleClick, {
        title: children as string,
        body: message || "Are you sure you want to proceed?",
      }),
    [requestConfirmation, children, handleClick, message]
  );

  return (
    <Button
      size="sm"
      onClick={gated ? gatedHandle : handleClick}
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
  gated?: boolean;
  message?: string;
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({
  loan: thisLoan,
  status: thisStatus,
  variant,
  children,
  gated,
  message,
}) => {
  const { loans, setLoans } = useContext(LoanContext);
  const requestConfirmation = useContext(ConfirmContext);

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

  const gatedHandle = useCallback(
    () =>
      requestConfirmation(handleClick, {
        title: children as string,
        body: message || "Are you sure you want to proceed?",
      }),
    [requestConfirmation, children, handleClick, message]
  );
  return (
    <Button
      size="sm"
      onClick={gated ? gatedHandle : handleClick}
      variant={variant}
    >
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
