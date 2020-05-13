import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { Loan } from "./ourtypes";
import PageLayout from "./PageLayout";
import AutoTable, { TableColumn } from "./AutoTable";
import { Button } from "react-bootstrap";
import { toLoan } from "./mappers";
import { OwnerLoanManager, RequesterLoanManager } from "./LoanManagers";

interface LoanContext {
  loans: Loan[];
  setLoans: (loans: Loan[]) => void;
}

const defaultLoanContext: LoanContext = {
  loans: [],
  setLoans: (loans: Loan[]) => {},
};

export const LoanContext = React.createContext<LoanContext>(defaultLoanContext);

const LoansPage: React.FC = () => {
  const [reqIsLoaded, setReqIsLoaded] = useState(false);
  const [ownIsLoaded, setOwnIsLoaded] = useState(false);
  const [loanedToMe, setLoanedToMe] = useState<Loan[]>([
    {
      id: "1",
      book_id: "2",
      status: "pending",
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "",
      requester_contact: "",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
    {
      id: "2",
      book_id: "1",
      status: "accepted",
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "",
      requester_contact: "",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
  ]);
  const [loanedByMe, setLoanedByMe] = useState<Loan[]>([]);

  useEffect(() => {
    fetch("http://paralibrary.digital/api/loans/requester", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setLoanedToMe(result.map(toLoan));
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setReqIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    fetch("http://paralibrary.digital/api/loans/owner", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setLoanedByMe(result.map(toLoan));
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setOwnIsLoaded(true);
      });
  }, []);

  const myBorrowing: Loan[] = useMemo(
    () => loanedToMe.filter((loan: Loan) => loan.status === "loaned"),
    [loanedToMe]
  );

  const myRequests: Loan[] = useMemo(
    () =>
      loanedToMe
        .filter(
          (loan: Loan) =>
            loan.status === "pending" || loan.status === "accepted"
        )
        .sort((a: Loan, b: Loan) => Number(a.status > b.status)),
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
          <LoanContext.Provider
            value={{ loans: loanedByMe, setLoans: setLoanedByMe }}
          >
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
              <TableColumn col={"requester_id"}>Requester ID</TableColumn>
              <span>wants</span>
              <TableColumn col={"book_id"}>Book ID</TableColumn>
              <OwnerLoanManager />
            </AutoTable>
          </LoanContext.Provider>

          <LoanContext.Provider
            value={{ loans: loanedToMe, setLoans: setLoanedToMe }}
          >
            <AutoTable data={myRequests} title={<h3>My Requests</h3>}>
              <span>You requested</span>
              <TableColumn col={"book_id"}>Book ID</TableColumn>
              <span>from</span>
              <TableColumn col={"requester_id"}>Requester ID</TableColumn>
              <RequesterLoanManager />
            </AutoTable>
          </LoanContext.Provider>

          <LoanContext.Provider
            value={{ loans: loanedByMe, setLoans: setLoanedByMe }}
          >
            <AutoTable
              data={loanedOut}
              title={<h3>Loaned Books</h3>}
              hideOnEmpty
            >
              <span>You've lent</span>
              <TableColumn col={"book_id"}>Book ID</TableColumn>
              <span>to</span>
              <TableColumn col={"owner_id"}>Owner ID</TableColumn>
              <span>due</span>
              <TableColumn col={"loan_end_date"}>Due Date</TableColumn>
              <OwnerLoanManager />
            </AutoTable>
          </LoanContext.Provider>

          <LoanContext.Provider
            value={{ loans: loanedToMe, setLoans: setLoanedToMe }}
          >
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
              <TableColumn col={"book_id"}>Book ID</TableColumn>
              <span>from</span>
              <TableColumn col={"requester_id"}>Requester ID</TableColumn>
              <span>on</span>
              <TableColumn col={"loan_start_date"}>Loan Date</TableColumn>
              <RequesterLoanManager />
            </AutoTable>
          </LoanContext.Provider>
        </>
      )}
    </PageLayout>
  );
};

export default LoansPage;
