import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { Loan } from "./ourtypes";
import PageLayout from "./PageLayout";
import AutoTable, { TableColumn } from "./AutoTable";
import BookDisplay from "./BookDisplay";
import UserDisplay from "./UserDisplay";
import { toLoan } from "./mappers";
import { OwnerLoanManager, RequesterLoanManager } from "./LoanManagers";
import StatusSpan from "./StatusSpan";

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
      id: "5",
      book_id: "91",
      status: "pending",
      book: {
        id: "1",
        user_id: "1",
        title: "Consider Phlebas",
        author: "Iain M. Banks",
        isbn: "",
        summary: "",
        visibility: "public",
      },
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "bob@bob.bob",
      requester_contact: "sally@sally.sally",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
    {
      id: "6",
      book_id: "73",
      status: "accepted",
      book: {
        id: "73",
        user_id: "1",
        title: "Of Mice and Men",
        author: "",
        isbn: "",
        summary: "",
        visibility: "public",
      },
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "bob@bob.bob",
      requester_contact: "sally@sally.sally",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
    {
      id: "7",
      book_id: "37",
      book: {
        id: "1",
        user_id: "1",
        title: "The Fifth Season",
        author: "",
        isbn: "",
        summary: "",
        visibility: "public",
      },
      status: "loaned",
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "bob@bob.bob",
      requester_contact: "sally@sally.sally",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
    {
      id: "8",
      book_id: "4",
      status: "returned",
      book: {
        id: "1",
        user_id: "1",
        title: "The Name of This Book is Secret",
        author: "",
        isbn: "",
        summary: "",
        visibility: "public",
      },
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "bob@bob.bob",
      requester_contact: "sally@sally.sally",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
  ]);
  const [loanedByMe, setLoanedByMe] = useState<Loan[]>([
    {
      id: "1",
      book_id: "2",
      status: "pending",
      book: {
        id: "1",
        user_id: "1",
        title: "Dummy's Guide to Telekinesis",
        author: "",
        isbn: "",
        summary: "",
        visibility: "public",
      },
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "bob@bob.bob",
      requester_contact: "sally@sally.sally",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
    {
      id: "2",
      book_id: "1",
      status: "accepted",
      book: {
        id: "1",
        user_id: "1",
        title: "Third Class Superhero",
        author: "",
        isbn: "",
        summary: "",
        visibility: "public",
      },
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "bob@bob.bob",
      requester_contact: "sally@sally.sally",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
    {
      id: "3",
      book_id: "3",
      status: "loaned",
      book: {
        id: "1",
        user_id: "1",
        title: "Genius at Play",
        author: "",
        isbn: "",
        summary: "",
        visibility: "public",
      },
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "bob@bob.bob",
      requester_contact: "sally@sally.sally",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
    {
      id: "4",
      book_id: "4",
      status: "returned",
      book: {
        id: "1",
        user_id: "1",
        title: "Cryptonomicon",
        author: "",
        isbn: "",
        summary: "",
        visibility: "public",
      },
      owner: {
        id: "1",
        name: "Bob",
      },
      requester: {
        id: "2",
        name: "Sally",
      },
      owner_contact: "bob@bob.bob",
      requester_contact: "sally@sally.sally",
      accept_date: new Date(),
      request_date: new Date(),
      loan_start_date: new Date(),
      loan_end_date: new Date(),
    },
  ]);

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
    () =>
      loanedToMe
        .filter(
          (loan: Loan) => loan.status === "loaned" || loan.status === "returned"
        )
        .sort((a: Loan, b: Loan) => Number(a.status < b.status)),
    [loanedToMe]
  );

  const myRequests: Loan[] = useMemo(
    () =>
      loanedToMe
        .filter(
          (loan: Loan) =>
            loan.status === "pending" || loan.status === "accepted"
        )
        .sort((a: Loan, b: Loan) => Number(a.status < b.status)),
    [loanedToMe]
  );

  const requestedFromMe: Loan[] = useMemo(
    () =>
      loanedByMe
        .filter(
          (loan: Loan) =>
            loan.status === "pending" || loan.status === "accepted"
        )
        .sort((a: Loan, b: Loan) => Number(a.status < b.status)),
    [loanedByMe]
  );

  const loanedOut: Loan[] = useMemo(
    () =>
      loanedByMe
        .filter(
          (loan: Loan) => loan.status === "returned" || loan.status === "loaned"
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
              title={<h3>Incoming Requests</h3>}
              noHeaders
              placeholder={
                <>
                  <span>No requests? </span>
                  <Link to={"/library"}>Add more books to your library!</Link>
                </>
              }
            >
              <TableColumn col={"requester"} component={UserDisplay}>
                Requester ID
              </TableColumn>
              <StatusSpan
                pending="wants to borrow"
                accepted="is waiting to pick up"
              />
              <TableColumn col={"book"} component={BookDisplay}>
                Book ID
              </TableColumn>
              <OwnerLoanManager />
            </AutoTable>
          </LoanContext.Provider>

          <LoanContext.Provider
            value={{ loans: loanedToMe, setLoans: setLoanedToMe }}
          >
            <AutoTable data={myRequests} title={<h3>My Requests</h3>} noHeaders>
              <StatusSpan pending="Requested" accepted="Request for" />
              <TableColumn col={"book"} component={BookDisplay}>
                Book ID
              </TableColumn>
              <StatusSpan pending="from" accepted="granted by" />
              <TableColumn col={"owner"} component={UserDisplay}>
                Requester ID
              </TableColumn>
              <RequesterLoanManager />
            </AutoTable>
          </LoanContext.Provider>

          <LoanContext.Provider
            value={{ loans: loanedByMe, setLoans: setLoanedByMe }}
          >
            <AutoTable
              data={loanedOut}
              title={<h3>My Loaning</h3>}
              hideOnEmpty
              noHeaders
            >
              <TableColumn col={"requester"} component={UserDisplay}>
                Owner ID
              </TableColumn>
              <StatusSpan loaned="borrowed" returned="returned" />
              <TableColumn col={"book"} component={BookDisplay}>
                Book ID
              </TableColumn>

              <OwnerLoanManager />
            </AutoTable>
          </LoanContext.Provider>

          <LoanContext.Provider
            value={{ loans: loanedToMe, setLoans: setLoanedToMe }}
          >
            <AutoTable
              data={myBorrowing}
              title={<h3>My Borrowing</h3>}
              noHeaders
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
              <StatusSpan loaned="You've borrowed" returned="You've returned" />
              <TableColumn col={"book"} component={BookDisplay}>
                Book ID
              </TableColumn>
              <StatusSpan loaned="from" returned="to" />
              <TableColumn col={"owner"} component={UserDisplay}>
                Requester ID
              </TableColumn>
              <RequesterLoanManager />
            </AutoTable>
          </LoanContext.Provider>
        </>
      )}
    </PageLayout>
  );
};

export default LoansPage;
