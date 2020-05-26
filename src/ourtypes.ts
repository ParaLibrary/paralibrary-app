export interface Loan {
  id: string;
  owner: User;
  requester: User;
  book?: Book;
  request_date?: Date;
  accept_date?: Date;
  loan_start_date?: Date;
  loan_end_date?: Date;
  status: LoanStatus;
}

export type LoanStatus =
  | "pending"
  | "accepted"
  | "loaned"
  | "returned"
  | "canceled"
  | "declined";

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string;
  categories: string[];
  isbn: string;
  summary: string;
  visibility: Visibility;
  loan?: Loan;
}

export type Visibility = "public" | "private" | "friends";

export interface User {
  id: string;
  name: string;
  status: FriendStatus;
  email: string;
}

export type FriendStatus = "requested" | "friends" | "waiting" | null;

export interface Library {
  user: User;
  books: Book[];
}

export interface Option {
  label: string;
  value: string;
}
