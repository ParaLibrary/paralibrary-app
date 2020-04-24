import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { Loan } from "./ourtypes";
import PageLayout from "./PageLayout";
import AutoTable, { TableHeader } from "./Table";
import { Button } from "react-bootstrap";

const LoansPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loanedToMe, setLoanedToMe] = useState<Loan[]>([]);
  useEffect(() => {
    fetch("http://paralibrary.digital/api/loans/requester")
      .then((res) => {
        setIsLoaded(true);
        return res.json();
      })
      .then(
        (result) => {
          setLoanedToMe(result);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        setIsLoaded(true);
        console.log(error);
      });
  }, []);

  const borrowed: Loan[] = useMemo(
    () => loanedToMe.filter((loan: Loan) => loan.status === "loaned"),
    [loanedToMe]
  );

  const requested: Loan[] = useMemo(
    () => loanedToMe.filter((loan: Loan) => loan.status === "pending"),
    [loanedToMe]
  );

  return (
    <PageLayout header={<h1>Loans Management</h1>}>
      {!isLoaded ? (
        "Loading..."
      ) : (
        <>
          <AutoTable data={requested} title={<h3>Requested Books</h3>}>
            <span>You requested</span>
            <TableHeader col={"book_id"}>Book ID</TableHeader>
            <span>from</span>
            <TableHeader col={"requester_id"}>Requester ID</TableHeader>
            <Button>Cancel Request?</Button>
          </AutoTable>
          <AutoTable
            data={borrowed}
            title={<h3>Borrowed Books</h3>}
            placeholder={
              requested.length === 0 ? (
                <div>
                  <span>Doesn't look like you've borrowed any books.</span>
                  <br></br>
                  <Link to={"/friends"}>Check out a friend's library!</Link>
                </div>
              ) : (
                <span>No books currently borrowed.</span>
              )
            }
          >
            <span>You borrowed</span>
            <TableHeader col={"book_id"}>Book ID</TableHeader>
            <span>from</span>
            <TableHeader col={"requester_id"}>Requester ID</TableHeader>
            <span>on</span>
            <TableHeader col={"loan_start_date"}>Loan Date</TableHeader>
            <Button>Cancel Request?</Button>
          </AutoTable>
        </>
      )}
    </PageLayout>
  );
};

export default LoansPage;
