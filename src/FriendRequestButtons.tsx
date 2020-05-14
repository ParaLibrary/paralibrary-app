import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

import { User } from "./ourtypes";

export interface FriendRequestEvent {
  successful: boolean;
  id: string;
}

interface ButtonGroupProps {
  rowitem?: User;
  onAccept?: (event: FriendRequestEvent) => void;
  onReject?: (event: FriendRequestEvent) => void;
}

function AcceptFriendship(id: string) {
  return fetch(`http://paralibrary.digital/api/friends/${id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      action: "accept",
    }),
  });
}

function RejectFriendship(id: string) {
  return fetch(`http://paralibrary.digital/api/friends/${id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      action: "reject",
    }),
  });
}

const FriendRequestButtons: React.FC<ButtonGroupProps> = ({
  rowitem: friend,
  onAccept,
  onReject,
}) => {
  if (!friend) {
    throw new Error("Row lacks valid data");
  }

  useEffect(() => {}, []);

  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={() => {
          AcceptFriendship(friend.id)
            .then((response) => {
              return {
                successful: response.ok,
                id: friend.id,
              };
            })
            .then(onAccept)
            .catch((error) => console.error(error));
        }}
      >
        Accept
      </Button>{" "}
      <Button
        type="button"
        variant="outline-danger"
        size="sm"
        onClick={() => {
          RejectFriendship(friend.id)
            .then((response) => {
              return {
                successful: response.ok,
                id: friend.id,
              };
            })
            .then(onReject)
            .catch((error) => console.error(error));
        }}
      >
        Reject
      </Button>
    </>
  );
};

export default FriendRequestButtons;
