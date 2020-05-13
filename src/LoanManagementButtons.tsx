import React, { useCallback, useContext, useState } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";

import { LoanContext } from "./LoansPage";
import { Loan, LoanStatus } from "./ourtypes";

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
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClick = useCallback(
    (loan: Loan) => {
      setDisabled(true);
      fetch(`http://paralibrary.digital/loans/${thisLoan.id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            setLoans(loans.filter((loan) => loan.id !== thisLoan.id));
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setDisabled(false);
        });
    },
    [loans]
  );

  return (
    <Button size="sm" disabled={disabled} variant={variant}>
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
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClick = useCallback(
    (loan: Loan) => {
      setDisabled(true);
      const newLoan: Loan = { ...thisLoan, status: thisStatus };
      fetch(`http://paralibrary.digital/loans/${thisLoan.id}`, {
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
        .catch((error) => console.log(error))
        .finally(() => {
          setDisabled(false);
        });
    },
    [loans]
  );
  return (
    <Button size="sm" disabled={disabled}>
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
      Contact?
    </Button>
  );
};
