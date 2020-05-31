import React from "react";
import Button from "react-bootstrap/Button";
import {
  FriendRejectButton,
  FriendAcceptReject,
  FriendRequestButton,
} from "./FriendshipButtons";

import { User } from "./ourtypes";

interface FRBProps {
  friend: User;
}

const FriendStatusButton: React.FC<FRBProps> = ({ friend }) => {
  if (!friend) {
    throw Error("Friend is not a valid user object");
  }

  function actionButton(friend: User) {
    switch (friend.status) {
      case null:
        return (
          <FriendRequestButton friend={friend}>
            Send friend request
          </FriendRequestButton>
        );
      case "friends":
        return (
          <>
            <Button variant="success" disabled>
              Friends
            </Button>{" "}
            <FriendRejectButton friend={friend} gated>
              Remove Friend
            </FriendRejectButton>
          </>
        );
      case "requested":
        return (
          <Button size="sm" variant="info" disabled>
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
