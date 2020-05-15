import React, { useCallback, useEffect, Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import FriendshipResponseButtons from "./FriendshipResponseButtons";

import { User } from "./ourtypes";

interface FRBProps {
  rowitem?: User;
  onClick: Dispatch<SetStateAction<User | undefined>>;
}

const FriendshipRequestButton: React.FC<FRBProps> = ({
  rowitem: friend,
  onClick,
}) => {
  useEffect(() => {
    console.log(friend);
  }, []);

  const requestFriendship = useCallback(() => {
    if (!friend) {
      return;
    }
    onClick({ ...friend, status: "requested" });
    fetch(`http://paralibrary.digital/api/friends/${friend.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...friend, action: "request" }),
    }).catch((error) => console.log(error));
  }, [friend]);

  if (!friend) {
    return <></>;
  }

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
          Requested
        </Button>
      )}
      {friend.status === "waiting" && (
        <div>
          <span>{friend.name} wants to be friends with you!</span>
          <FriendshipResponseButtons />
        </div>
      )}
    </>
  );
};

export default FriendshipRequestButton;
