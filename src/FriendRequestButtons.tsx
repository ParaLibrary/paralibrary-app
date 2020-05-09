import React from "react";
import { Button } from "react-bootstrap";

import { Friend } from "./ourtypes";

interface ButtonGroupProps {
  data?: Friend;
  onAccept: (id: string) => {};
  onReject: (id: string) => {};
}

const FriendRequestButtons: React.FC<ButtonGroupProps> = ({
  data,
  onAccept,
  onReject,
}) => {
  if (!data) {
    throw new Error("Row lacks valid data");
  }
  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={() => {
          onAccept(data.id);
        }}
      >
        Accept
      </Button>{" "}
      <Button
        type="button"
        variant="outline-danger"
        size="sm"
        onClick={() => {
          onReject(data.id);
        }}
      >
        Reject
      </Button>
    </>
  );
};

export default FriendRequestButtons;
