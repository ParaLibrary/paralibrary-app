import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { Loan } from "./ourtypes";
import PageLayout from "./PageLayout";
import { toLoan } from "./mappers";
import List from "./List";
import LoanDisplay from "./LoanDisplay";

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
  const [error, setError] = useState(false);
  const [reqIsLoaded, setReqIsLoaded] = useState(false);
  const [ownIsLoaded, setOwnIsLoaded] = useState(false);
  const [loanedToMe, setLoanedToMe] = useState<Loan[]>([]);
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
          setError(true);
        }
      )
      .catch((error) => {
        console.log(error);
        setError(true);
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
    <PageLayout
      header={<h1>Loans Management</h1>}
      error={error}
      loaded={reqIsLoaded || ownIsLoaded}
    >
      <LoanContext.Provider
        value={{ loans: loanedByMe, setLoans: setLoanedByMe }}
      >
        <List
          items={requestedFromMe}
          title={<h3>Incoming Requests</h3>}
          placeholder={
            <p>
              <span>No requests? </span>
              <Link to={"/library"}>Add more books to your library!</Link>
            </p>
          }
          userRole="owner"
          component={LoanDisplay}
        />
      </LoanContext.Provider>

      <LoanContext.Provider
        value={{ loans: loanedToMe, setLoans: setLoanedToMe }}
      >
        <List
          items={myRequests}
          title={<h3>My Requests</h3>}
          userRole="requester"
          component={LoanDisplay}
        />
      </LoanContext.Provider>

      <LoanContext.Provider
        value={{ loans: loanedByMe, setLoans: setLoanedByMe }}
      >
        <List
          items={loanedOut}
          title={<h3>My Loaning</h3>}
          userRole="owner"
          component={LoanDisplay}
        />
      </LoanContext.Provider>

      <LoanContext.Provider
        value={{ loans: loanedToMe, setLoans: setLoanedToMe }}
      >
        <List
          items={myBorrowing}
          title={<h3>My Borrowing</h3>}
          userRole="requester"
          placeholder={
            myRequests.length === 0 ? (
              <p>
                <span>Doesn't look like you've borrowed any books.</span>
                <br />
                <Link to={"/friends"}>Check out a friend's library!</Link>
              </p>
            ) : (
              <span>No books currently borrowed.</span>
            )
          }
          component={LoanDisplay}
        />
      </LoanContext.Provider>
    </PageLayout>
  );
};

export default LoansPage;
