import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import PageLayout from "./PageLayout";
import { Book, Loan, User } from "./ourtypes";
import AutoTable, { TableHeader } from "./Table";
import LoanRequestButton from "./LoanRequestButton";

const FriendLibraryPage: React.FC = () => {
  const { id } = useParams();

  const [booksAreLoaded, setBooksAreLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [requests, setRequests] = useState<Loan[]>([]);
  const [loansAreLoaded, setLoansAreLoaded] = useState(false);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    fetch(`http://paralibrary.digital/api/books`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(
        (result) => {
          setBooks(result as Book[]);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setBooksAreLoaded(true);
      });
  }, []);

  useEffect(() => {
    fetch("http://paralibrary.digital/api/loans/requester")
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setRequests(result);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoansAreLoaded(true);
      });
  }, []);

  useEffect(() => {
    fetch(`http://paralibrary.digital/api/users/${id}`)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setUser(result);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return !booksAreLoaded ? (
    <span>Loading...</span>
  ) : (
    <PageLayout header={!user ? null : <h1>{user.display_name}'s Library</h1>}>
      {!!user && (
        <>
          {!loansAreLoaded && (
            <span>
              Error: Unable to check if you have any current loans from this
              user.
            </span>
          )}

          <AutoTable
            data={books}
            title={<h3>Books</h3>}
            placeholder={
              <span>
                Huh, looks like {user.display_name} hasn't added anything to
                their library.
              </span>
            }
          >
            <TableHeader col="title">Title</TableHeader>
            <TableHeader col="author">Author</TableHeader>
            <TableHeader col="summary">Description</TableHeader>
            <LoanRequestButton userID={1} id={0} loans={requests} />
          </AutoTable>
        </>
      )}
    </PageLayout>
  );
};

export default FriendLibraryPage;
