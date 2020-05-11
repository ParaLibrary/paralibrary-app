import React, { useCallback } from "react";
import Button from "react-bootstrap/Button";

import { Friend } from "./ourtypes";

interface FRBProps {
  rowitem?: Friend;
}

const FriendshipRequestButton: React.FC<FRBProps> = ({ rowitem: friend }) => {
  if (!friend) {
    throw new Error("Row lacks data");
  }
  const handleClick = useCallback(() => {
    fetch(`http://paralibrary.digital/friends/${friend.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...friend, status: "requested" }),
    }).catch((error) => console.log(error));
    // TODO: add .then statements to handle any state updates that
    // should happen in future use
  }, [friend]);

  return <Button onClick={handleClick}>Send friend request</Button>;
};

export default FriendshipRequestButton;
