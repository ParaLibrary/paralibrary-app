export interface Friend {
  id: number;
  display_name: string;
  name: string;
  status: "requested" | "friends";
}

export interface Loan {
  id: number;
  owner_id: number;
  requester_id: number;
  book_id: number;
  request_date: Date;
  accept_date: Date;
  loan_start_date: Date;
  loan_end_date: Date;
  status: "pending" | "accepted" | "loaned" | "returned" | "late";
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
