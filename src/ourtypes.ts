export interface Friend {
  id: string;
  display_name: string;
  name: string;
  status: "requested" | "friends";
}

export interface Loan extends LoanRequest {
  id: string;
  owner_id: string;
  owner_contact: string;
  requester_id: string;
  requester_contact: string;
  book_id: string;
  request_date: Date;
  accept_date: Date;
  loan_start_date: Date;
  loan_end_date: Date;
  status: "pending" | "accepted" | "loaned" | "returned" | "late";
}

export interface LoanRequest {
  book_id: string;
  requester_contact: string;
}

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string;
  isbn: string;
  summary: string;
  private: boolean;
  loan?: Loan;
}

export interface User {
  id: string;
  display_name: string;
  name: string;
}
