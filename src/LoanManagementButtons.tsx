import React, { useCallback, useContext } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";

import { LoanContext } from "./LoansPage";
import { Loan, LoanStatus } from "./ourtypes";
import ConfirmContext from "./ConfirmationContext";
import { useToasts } from "./ToastProvider";

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
  const { addToast } = useToasts();

  const handleClick = useCallback(() => {
    fetch(`http://paralibrary.digital/api/loans/${thisLoan.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setLoans(loans.filter((loan) => loan.id !== thisLoan.id));
        } else {
          throw Error();
        }
      })
      .catch((error) => {
        console.log(error);
        addToast({
          header: "Could not delete loan",
          body: "Something went wrong. Please try again in a few moments",
          type: "error",
        });
      });
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
  const { addToast } = useToasts();

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
        } else {
          throw Error();
        }
      })
      .catch((error) => {
        console.log(error);
        addToast({
          header: "Could not delete loan",
          body: "Something went wrong. Please try again in a few moments",
          type: "error",
        });
      });
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
  contact: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ contact }) => {
  return (
    <Button size="sm" variant="info" href={`mailto:${contact}`}>
      Contact
    </Button>
  );
};
