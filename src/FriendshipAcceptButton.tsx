import React from "react";
import { Button } from "react-bootstrap";

import { User } from "./ourtypes";

export interface FriendshipChangeEvent {
  successful: boolean;
  id: string;
}

interface AcceptButtonProps {
  rowitem?: User;
  onAccept?: (event: FriendshipChangeEvent) => void;
}

const FriendshipAcceptButton: React.FC<AcceptButtonProps> = ({
  rowitem: friend,
  onAccept,
}) => {
  function AcceptFriendship() {
    if (!friend) {
      throw new Error("Row lacks valid data");
    }

    return fetch(`http://paralibrary.digital/api/friends/${friend.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: friend.id,
        action: "accept",
      }),
    })
      .then((response) => {
        return {
          successful: response.ok,
          id: friend.id,
        };
      })
      .then(onAccept)
      .catch((error) => console.error(error));
  }

  return (
    <Button
      type="button"
      variant="primary"
      size="sm"
      onClick={AcceptFriendship}
    >
      Accept
    </Button>
  );
};

export default FriendshipAcceptButton;
