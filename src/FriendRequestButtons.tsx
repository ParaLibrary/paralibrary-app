import React from "react";
import { Button } from "react-bootstrap";

import { Friend } from "./ourtypes";

interface ButtonGroupProps {
  rowItem?: Friend;
  onAccept: (id: string) => {};
  onReject: (id: string) => {};
}

const FriendRequestButtons: React.FC<ButtonGroupProps> = ({
  rowItem: friend,
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
