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

  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    fetch(`http://paralibrary.digital/api/libraries/${id}`)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setBooks(result.books);
          setUser(result.user);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [isNewRequest, setIsNewRequest] = useState(true);
  const [successPromise, setRequestPromise] = useState<
    Promise<boolean> | boolean
  >(false);
  const [selectedLoan, setSelectedLoan] = useState<{
    book_id: number;
    requester_contact: string;
  }>({ book_id: -1, requester_contact: "" });

  const handleRequest = useCallback(
    (bookID: number) => {
      setIsNewRequest(true);
      setSelectedLoan({ book_id: bookID, requester_contact: "" });
      setModalOpen(true);
      return successPromise;
    },
    [successPromise]
  );

  const updateDatabase = useCallback((loan: LoanRequest) => {
    setRequestPromise(
      fetch("http://paralibrary.digital/api/loans", {
        method: "PUT",
        body: JSON.stringify(loan),
      })
        .then((resp) => resp.ok)
        .catch(() => false)
    );
  }, []);

  const handleCancel = useCallback(async (loan: Loan) => {
    return fetch(`http://paralibrary.digital/api/loans/${loan.id}`, {
      method: "DELETE",
      body: JSON.stringify(loan),
    }).then((res) => res.ok);
  }, []);

  return (
    <PageLayout header={!user ? null : <h1>{user.display_name}'s Library</h1>}>
      <AutoTable
        data={books}
        title={<h3>Books</h3>}
        placeholder={
          <span>
            Huh, looks like {user && user.display_name} hasn't added anything to
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
          books={books}
          onRequest={handleRequest}
          onCancel={handleCancel}
        />
      </AutoTable>
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
