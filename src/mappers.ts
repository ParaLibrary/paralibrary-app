import {
  Book,
  FriendStatus,
  Library,
  Loan,
  User,
  Visibility,
  LoanStatus,
} from "./ourtypes";

import { isNullOrUndefined } from "util";

export function toLibrary(obj: any): Library {
  if (!obj.user) {
    throw new Error("Missing property 'user' in library");
  }
  if (!obj.books || !obj.books.map) {
    throw new Error("Missing property 'books' in library");
  }
  return {
    user: toUser(obj.user),
    books: obj.books.map(toBook),
  };
}

export function toUser(obj: any): User {
  if (!obj.id) {
    throw new Error("Missing property 'id' in user");
  }
  if (!obj.name) {
    throw new Error("Missing property 'name' in user");
  }
  if (isNullOrUndefined(obj.picture)) {
    throw new Error("Missing property 'picture' in user");
  }
  return {
    id: obj.id,
    name: obj.name,
    status: obj.status as FriendStatus,
    picture: obj.picture,
  };
}

export function toBook(obj: any): Book {
  if (!obj.id) {
    throw new Error("Missing property 'id' in book");
  }
  if (!obj.user_id) {
    throw new Error("Missing property 'user_id' in book");
  }
  if (isNullOrUndefined(obj.title)) {
    throw new Error("Missing property 'title' in book");
  }
  if (isNullOrUndefined(obj.author)) {
    throw new Error("Missing property 'author' in book");
  }
  if (isNullOrUndefined(obj.isbn)) {
    throw new Error("Missing property 'isbn' in book");
  }
  if (isNullOrUndefined(obj.summary)) {
    throw new Error("Missing property 'summary' in book");
  }
  if (!(obj.visibility as Visibility)) {
    throw new Error("Missing or invalid property 'visibility' in book");
  }

  return {
    id: obj.id,
    user_id: obj.user_id,
    title: obj.title,
    author: obj.author,
    categories: obj.categories || [],
    isbn: obj.isbn,
    summary: obj.summary,
    visibility: obj.visibility,
    loan: !!obj.loan ? toLoan(obj.loan) : undefined,
  };
}

export function toLoan(obj: any): Loan {
  if (!obj.id) {
    throw new Error("Missing property 'id' in loan");
  }
  if (!obj.owner) {
    throw new Error("Missing property 'owner' in loan");
  }
  const owner = toUser(obj.owner);
  if (!obj.requester) {
    throw new Error("Missing property 'requester' in loan");
  }
  const requester = toUser(obj.requester);
  if (!obj.requester_contact) {
    throw new Error("Missing property 'requester_contact' in loan");
  }
  const book = !!obj.book ? toBook(obj.book) : undefined;
  if (!book && !obj.book_id) {
    throw new Error("Missing property 'book' and 'book_id' in loan");
  }

  if (!(obj.status as LoanStatus)) {
    throw new Error("Missing property 'status' in loan");
  }
  return {
    id: obj.id,
    book,
    book_id: !!book ? book.id : obj.book_id,
    requester,
    owner,
    requester_contact: obj.requester_contact,
    request_date: obj.request_date && new Date(obj.request_date),
    accept_date: obj.accept_date && new Date(obj.accept_date),
    loan_start_date: obj.loan_start_date && new Date(obj.loan_start_date),
    loan_end_date: obj.loan_end_date && new Date(obj.loan_end_date),
    status: obj.status,
  };
}
