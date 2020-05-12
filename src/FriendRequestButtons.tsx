import React from "react";
import { Button } from "react-bootstrap";

interface ButtonGroupProps {
  id: string;
  onAccept: (id: string) => {};
  onReject: (id: string) => {};
}

const FriendRequestButtons: React.FC<ButtonGroupProps> = ({
  id,
  onAccept,
  onReject,
}) => {
  return (
    <div>
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={() => {
          onAccept(id);
        }}
      >
        Accept
      </Button>{" "}
      <Button
        type="button"
        variant="outline-danger"
        size="sm"
        onClick={() => {
          onReject(id);
        }}
      >
        Reject
      </Button>
    </div>
  );
};

export default FriendRequestButtons;
