import React from "react";
import { Button } from "react-bootstrap";
import { FriendshipChangeEvent } from "./FriendshipAcceptButton";

import { User } from "./ourtypes";

interface RejectButtonProps {
  rowitem?: User;
  onReject?: (event: FriendshipChangeEvent) => void;
}

const FriendshipRejectButton: React.FC<RejectButtonProps> = ({
  rowitem: friend,
  onReject,
}) => {
  function RejectFriendship() {
    if (!friend) {
      throw new Error("Row lacks valid data");
    }

    return fetch(`http://localhost:8080/api/friends/${friend.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: friend.id,
        action: "reject",
      }),
    })
      .then((response) => {
        return {
          successful: response.ok,
          id: friend.id,
        };
      })
      .then(onReject)
      .catch((error) => console.error(error));
  }

  return (
    <Button
      type="button"
      variant="outline-danger"
      size="sm"
      onClick={RejectFriendship}
    >
      Reject
    </Button>
  );
};

export default FriendshipRejectButton;
