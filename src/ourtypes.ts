export interface Friend {
  id: number;
  id: string;
  display_name: string;
  name: string;
  status: "requested" | "friends";
}

export interface Loan {
  id: number;
  owner_id: number;
  requester_id: number;
  book_id: number;
  id: string;
  owner_id: string;
  requester_id: string;
  book_id: string;
  request_date: Date;
  accept_date: Date;
  loan_start_date: Date;
  loan_end_date: Date;
  status: "pending" | "accepted" | "loaned" | "returned" | "late";
}

export interface Book {
  id: number;
  id: string;
  user_id: string;
  title: string;
  author: string;
  isbn: string;
  summary: string;
  private: boolean;
}

export interface User {
  id: number;
  id: string;
  display_name: string;
  name: string;
}
