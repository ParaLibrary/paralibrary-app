import React, { useCallback } from "react";
import Button from "react-bootstrap/Button";
import { FriendRejectButton, FriendAcceptReject } from "./FriendshipButtons";
import { useToasts } from "./ToastProvider";

import { User } from "./ourtypes";

interface FRBProps {
  friend: User;
}

const FriendStatusButton: React.FC<FRBProps> = ({ friend }) => {
  const { addToast } = useToasts();

  if (!friend) {
    throw Error("Friend is not a valid user object");
  }

  const requestFriendship = useCallback(() => {
    fetch(`http://paralibrary.digital/api/friends/${friend.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...friend, action: "request" }),
    })
      .then(() => {
        addToast({
          header: "Friend request sent!",
          body: "This user will appear in your friends list if they accept",
        });
      })
      .catch((error) => {
        console.error("error: " + error);
        addToast({
          header: "Error sending friend request",
          body: "Could not reach the server. Please try again in a few moments",
          type: "error",
        });
      });
  }, [friend, addToast]);

  function actionButton(friend: User) {
    switch (friend.status) {
      case null:
        return <Button onClick={requestFriendship}>Send friend request</Button>;
      case "friends":
        return (
          <>
            <Button variant="success" disabled>
              Friends
            </Button>{" "}
            <FriendRejectButton friend={friend} size="sm">
              Remove Friend
            </FriendRejectButton>
          </>
        );
      case "requested":
        return (
          <Button variant="info" disabled>
            Requested
          </Button>
        );
      case "waiting":
        return <FriendAcceptReject friend={friend} />;
    }
  }

  return <>{actionButton(friend)}</>;
};

export default FriendStatusButton;
