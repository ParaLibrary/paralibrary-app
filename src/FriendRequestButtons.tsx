import React from "react";
import { Button } from "react-bootstrap";

import { User } from "./ourtypes";

interface ButtonGroupProps {
  rowitem?: User;
  onAccept: (id: string) => {};
  onReject: (id: string) => {};
}

const FriendRequestButtons: React.FC<ButtonGroupProps> = ({
  rowitem: friend,
  onAccept,
  onReject,
}) => {
  if (!friend) {
    throw new Error("Row lacks valid data");
  }
  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={() => {
          onAccept(friend.id);
        }}
      >
        Accept
      </Button>{" "}
      <Button
        type="button"
        variant="outline-danger"
        size="sm"
        onClick={() => {
          onReject(friend.id);
        }}
      >
        Reject
      </Button>
    </>
  );
};

export default FriendRequestButtons;
