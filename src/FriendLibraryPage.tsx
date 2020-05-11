import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Modal } from "react-bootstrap";

import PageLayout from "./PageLayout";
import { Book, LoanRequest, Loan, User } from "./ourtypes";
import AutoTable, { TableColumn } from "./AutoTable";
import LoanRequestButton from "./LoanRequestButton";
import LoanFormik from "./LoanForm";

const FriendLibraryPage: React.FC = () => {
  const { id } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    fetch(`http://paralibrary.digital/api/libraries/${id}`, {
      credentials: "include",
    })
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
  }, [id]);

  const [modalOpen, setModalOpen] = useState(false);
  const [isNewRequest, setIsNewRequest] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState<Loan | LoanRequest>({
    book_id: "",
    requester_contact: "",
    status: "pending",
  });

  const handleRequest = useCallback((bookID: string) => {
    setIsNewRequest(true);
    setSelectedLoan({
      book_id: bookID,
      requester_contact: "",
      status: "pending",
    });
    setModalOpen(true);
  }, []);

  const updateDatabase = useCallback(
    (loan: LoanRequest) => {
      fetch("http://paralibrary.digital/api/loans", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loan),
      })
        .then((res) => res.json())
        .then((res: Loan) => {
          setBooks(
            books.map((book) =>
              book.id !== loan.book_id ? book : { ...book, loan: res }
            )
          );
        })
        .catch(() => false);
    },
    [books]
  );

  const handleCancel = useCallback(async (loan: Loan) => {
    fetch(`http://paralibrary.digital/api/loans/${loan.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loan),
    });
  }, []);

  return !isLoaded ? (
    <PageLayout header={<h1>Loading...</h1>} />
  ) : (
    <PageLayout
      header={
        !user ? <h1>User Not Found</h1> : <h1>{user && user.name}'s Library</h1>
      }
    >
      <AutoTable
        data={books}
        title={<h3>Books</h3>}
        placeholder={
          <span>
            Huh, looks like {user && user.name} hasn't added anything to their
            library.
          </span>
        }
      >
        <TableColumn col="title">Title</TableColumn>
        <TableColumn col="author">Author</TableColumn>
        <TableColumn col="summary">Description</TableColumn>
        <LoanRequestButton onRequest={handleRequest} onCancel={handleCancel} />
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
