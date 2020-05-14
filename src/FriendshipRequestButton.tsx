import React, { useCallback } from "react";
import Button from "react-bootstrap/Button";
import FriendRequestButtons from "./FriendRequestButtons";

import { User } from "./ourtypes";

interface FRBProps {
  rowitem?: User;
}

const FriendshipRequestButton: React.FC<FRBProps> = ({ rowitem: friend }) => {
  if (!friend) {
    throw new Error("Row lacks valid data");
  }
  const requestFriendship = useCallback(() => {
    fetch(`http://paralibrary.digital/api/friends/${friend.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...friend, action: "request" }),
    }).catch((error) => console.log(error));
    // TODO: add .then statements to handle any state updates that
    // should happen in future use
  }, [friend]);

  return (
    <>
      {friend.status == null && (
        <Button onClick={requestFriendship}>Send friend request</Button>
      )}
      {friend.status === "friends" && (
        <Button variant="success" disabled>
          Friends
        </Button>
      )}
      {friend.status === "requested" && (
        <Button variant="info" disabled onClick={requestFriendship}>
          Send friend request
        </Button>
      )}
      {friend.status === "waiting" && <FriendRequestButtons />}
    </>
  );
};

export default FriendshipRequestButton;
