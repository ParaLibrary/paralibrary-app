import React, { useCallback, useContext, useState } from "react";
import Button from "react-bootstrap/Button";

import { LoanContext } from "./LoansPage";
import { Loan, LoanStatus } from "./ourtypes";

interface DeleteButtonProps {
  loan: Loan;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  loan: thisLoan,
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
    <Button disabled={disabled} variant="outline-danger">
      {children}
    </Button>
  );
};

interface UpdateButtonProps {
  loan: Loan;
  status: LoanStatus;
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({
  loan: thisLoan,
  status: thisStatus,
  children,
}) => {
  const { loans, setLoans } = useContext(LoanContext);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClick = useCallback(
    (loan: Loan) => {
      setDisabled(true);
      fetch(`http://paralibrary.digital/loans/${thisLoan.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...thisLoan, status: thisStatus }),
      })
        .then((res) => {
          if (res.ok) {
            setLoans(
              loans.map((loan) =>
                loan.id !== thisLoan.id ? loan : { ...loan, status: thisStatus }
              )
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
  return <Button disabled={disabled}>{children}</Button>;
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
      href={`mailto:${
        userType === "owner" ? loan.owner_contact : loan.requester_contact
      }`}
    >
      Contact?
    </Button>
  );
};
