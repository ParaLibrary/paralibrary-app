import React, { useCallback } from "react";
import Button from "react-bootstrap/Button";

import { Friend } from "./ourtypes";

interface FRBProps {
  id: string;
}

const FriendRequestButton: React.FC<FRBProps> = ({ id }) => {
  const handleClick = useCallback(() => {
    fetch(`http://paralibrary.digital/friends/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: "requested" }),
      // This id seems redundant, but the backend readme has it...
    }).catch((error) => console.log(error));
  }, [id]);

  return <Button onClick={handleClick}>Send friend request</Button>;
};

export default FriendRequestButton;
