export interface Friend {
  id: number;
  display_name: string;
  name: string;
  status: "requested" | "friends";
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
