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
