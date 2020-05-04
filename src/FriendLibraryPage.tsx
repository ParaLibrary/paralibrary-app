import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Modal } from "react-bootstrap";

import PageLayout from "./PageLayout";
import { Book, LoanRequest, Loan, User } from "./ourtypes";
import AutoTable, { TableHeader } from "./Table";
import LoanRequestButton from "./LoanRequestButton";
import LoanFormik from "./LoanForm";

const FriendLibraryPage: React.FC = () => {
  const { id } = useParams();

  const [booksAreLoaded, setBooksAreLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      user_id: 1,
      title: "Test",
      author: "testy test",
      isbn: "",
      summary: "",
      private: true,
    },
  ]);
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

  const [modalOpen, setModalOpen] = useState(false);
  const [isNewRequest, setIsNewRequest] = useState(true);
  const [successPromise, setRequestPromise] = useState<Promise<boolean>>();
  const [selectedLoan, setSelectedLoan] = useState<{
    book_id: number;
    requester_contact: string;
  }>({ book_id: -1, requester_contact: "" });

  const handleRequest = useCallback(
    async (bookID: number) => {
      setIsNewRequest(true);
      setSelectedLoan({ book_id: bookID, requester_contact: "" });
      setModalOpen(true);
      return successPromise !== undefined && (await successPromise);
    },
    [successPromise]
  );

  const updateDatabase = useCallback((loan: LoanRequest) => {
    setRequestPromise(
      fetch("http://paralibrary.digital/api/loans", {
        method: "PUT",
        body: JSON.stringify(loan),
      }).then((resp) => resp.ok)
    );
  }, []);

  const handleCancel = useCallback(async (loan: Loan) => {
    return fetch(`http://paralibrary.digital/api/loans/${loan.id}`, {
      method: "DELETE",
      body: JSON.stringify(loan),
    }).then((res) => res.ok);
  }, []);

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
            <LoanRequestButton
              userID={1}
              id={0}
              loans={requests}
              onRequest={handleRequest}
              onCancel={handleCancel}
            />
          </AutoTable>
        </>
      )}
      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNewRequest ? "Request Book" : "Cancel Request"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoanFormik
            loan={selectedLoan}
            updateDatabase={updateDatabase}
            closeModal={() => setModalOpen(false)}
          />
        </Modal.Body>
      </Modal>
    </PageLayout>
  );
};

export default FriendLibraryPage;
