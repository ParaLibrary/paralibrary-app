export interface Friend {
  id: number;
  display_name: string;
  name: string;
  status: "requested" | "friends";
}
