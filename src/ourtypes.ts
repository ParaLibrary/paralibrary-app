export interface Friend {
  id: number;
  display_name: string;
  name: string;
  status: FriendStatus;
}

export enum FriendStatus {
  accepted,
  requested,
}

export interface Book {
  id: number;
  user_id: number;
  title: string;
  author: string;
  isbn: string;
  summary: string;
  visibility: BookVisibility;
}

export enum BookVisibility {
  public,
  private,
}
