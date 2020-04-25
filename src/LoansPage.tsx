import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { Loan } from "./ourtypes";
import PageLayout from "./PageLayout";
import AutoTable, { TableHeader } from "./Table";
import { Button } from "react-bootstrap";

const LoansPage: React.FC = () => {
  const [reqIsLoaded, setReqIsLoaded] = useState(false);
  const [ownIsLoaded, setOwnIsLoaded] = useState(false);
  const [loanedToMe, setLoanedToMe] = useState<Loan[]>([]);
  const [loanedByMe, setLoanedByMe] = useState<Loan[]>([]);

  useEffect(() => {
    fetch("http://paralibrary.digital/api/loans/requester")
      .then((res) => {
        setReqIsLoaded(true);
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
        setReqIsLoaded(true);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://paralibrary.digital/api/loans/owner")
      .then((res) => {
        setOwnIsLoaded(true);
        return res.json();
      })
      .then(
        (result) => {
          setLoanedByMe(result);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        setOwnIsLoaded(true);
        console.log(error);
      });
  }, []);

  const myBorrowing: Loan[] = useMemo(
    () => loanedToMe.filter((loan: Loan) => loan.status === "loaned"),
    [loanedToMe]
  );

  const myRequests: Loan[] = useMemo(
    () => loanedToMe.filter((loan: Loan) => loan.status === "pending"),
    [loanedToMe]
  );

  const requestedFromMe: Loan[] = useMemo(
    () => loanedByMe.filter((loan: Loan) => loan.status === "pending"),
    [loanedByMe]
  );

  const loanedOut: Loan[] = useMemo(
    () =>
      loanedByMe
        .filter(
          (loan: Loan) => loan.status === "accepted" || loan.status === "loaned"
        )
        .sort((a: Loan, b: Loan) => Number(a.status > b.status)),
    // May need to revise this once we loan management flow
    [loanedByMe]
  );

  return (
    <PageLayout header={<h1>Loans Management</h1>}>
      {!reqIsLoaded || !ownIsLoaded ? (
        "Loading..."
      ) : (
        <>
          <AutoTable
            data={requestedFromMe}
            title={<h3>Requested Books</h3>}
            placeholder={
              <>
                <span>No requests? </span>
                <Link to={"/library"}>Add more books to your library!</Link>
              </>
            }
          >
            <TableHeader col={"requester_id"}>Requester ID</TableHeader>
            <span>wants</span>
            <TableHeader col={"book_id"}>Book ID</TableHeader>
          </AutoTable>

          <AutoTable data={myRequests} title={<h3>My Requests</h3>}>
            <span>You requested</span>
            <TableHeader col={"book_id"}>Book ID</TableHeader>
            <span>from</span>
            <TableHeader col={"requester_id"}>Requester ID</TableHeader>
            <Button>Cancel Request?</Button>
          </AutoTable>

          <AutoTable data={loanedOut} title={<h3>Loaned Books</h3>} hideOnEmpty>
            <span>You've lent</span>
            <TableHeader col={"book_id"}>Book ID</TableHeader>
            <span>to</span>
            <TableHeader col={"owner_id"}>Owner ID</TableHeader>
            <span>due</span>
            <TableHeader col={"loan_end_date"}>Due Date</TableHeader>
          </AutoTable>

          <AutoTable
            data={myBorrowing}
            title={<h3>Borrowed Books</h3>}
            placeholder={
              myRequests.length === 0 ? (
                <>
                  <span>Doesn't look like you've borrowed any books.</span>
                  <br />
                  <Link to={"/friends"}>Check out a friend's library!</Link>
                </>
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
            <Button>Returned It!</Button>
          </AutoTable>
        </>
      )}
    </PageLayout>
  );
};

export default LoansPage;
