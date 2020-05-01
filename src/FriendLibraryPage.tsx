import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import PageLayout from "./PageLayout";
import { Book, Loan, User } from "./ourtypes";
import AutoTable, { TableHeader } from "./Table";

const FriendLibraryPage: React.FC = () => {
  const { id } = useParams();

  const [booksAreLoaded, setBooksAreLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
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

  const [requests, setRequests] = useState<Loan[]>([]);
  const [loansAreLoaded, setLoansAreLoaded] = useState(false);
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

  const [user, setUser] = useState<User>();
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

  return (
    <PageLayout
      header={
        !user ? (
          <h1>Library Not Found</h1>
        ) : (
          <h1>{user.display_name}'s Library</h1>
        )
      }
    >
      {!!user && (
        <div>
          {!loansAreLoaded && (
            <span>
              Error: Unable to check if you have any current loans from this
              user.
            </span>
          )}
          {!booksAreLoaded || !user ? (
            "Loading books..."
          ) : (
            <AutoTable
              data={books}
              title={<h3>Books</h3>}
              placeholder={
                <span>
                  Huh, looks like this {user.display_name} hasn't added anything
                  to their library.
                </span>
              }
            >
              <TableHeader col="title">Title</TableHeader>
            </AutoTable>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default FriendLibraryPage;
