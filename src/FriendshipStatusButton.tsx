import React, { useCallback, Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import AcceptRejectButtons from "./FriendshipAcceptRejectGroup";
import styled from "styled-components";
import { useToasts } from "./ToastProvider";

import { User } from "./ourtypes";

interface FRBProps {
  friend: User;
  onClick: Dispatch<SetStateAction<User | undefined>>;
}

const PaddedDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 30px;
`;

const FriendshipRequestButton: React.FC<FRBProps> = ({ friend, onClick }) => {
  const { addToast } = useToasts();
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
        console.log("OH");
      })
      .then(() => {
        onClick({ ...friend, status: "requested" });
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
  }, [friend, onClick, addToast]);

  function onAcceptClicked() {
    onClick({ ...friend, status: "friends" });
  }

  function onRejectClicked() {
    onClick({ ...friend, status: null });
  }

  function actionButton(friend: User) {
    switch (friend.status) {
      case null:
        return <Button onClick={requestFriendship}>Send friend request</Button>;
      case "friends":
        return (
          <Button variant="success" disabled>
            Friends
          </Button>
        );
      case "requested":
        return (
          <Button variant="info" disabled>
            Requested
          </Button>
        );
      case "waiting":
        return (
          <div>
            <div>{friend.name} wants to be friends with you!</div>
            <AcceptRejectButtons
              rowitem={friend}
              onAccept={onAcceptClicked}
              onReject={onRejectClicked}
            />
          </div>
        );
    }
  }

  return <PaddedDiv>{actionButton(friend)}</PaddedDiv>;
};

export default FriendshipRequestButton;
