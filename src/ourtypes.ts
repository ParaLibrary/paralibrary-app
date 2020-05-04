export interface Friend {
  id: number;
  display_name: string;
  name: string;
  status: "requested" | "friends";
}

export interface Loan extends LoanRequest {
  id: number;
  owner_id: number;
  owner_contact: string;
  requester_id: number;
  requester_contact: string;
  book_id: number;
  request_date: Date;
  accept_date: Date;
  loan_start_date: Date;
  loan_end_date: Date;
  status: "pending" | "accepted" | "loaned" | "returned" | "late";
}

export interface LoanRequest {
  book_id: number;
  requester_contact: string;
}

export interface Book {
  id: number;
  user_id: number;
  title: string;
  author: string;
  isbn: string;
  summary: string;
  private: boolean;
}

export interface User {
  id: number;
  display_name: string;
  name: string;
}
