import React, { useCallback } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import { User } from "./ourtypes";
import { useToasts } from "./ToastProvider";
import { useUserList } from "./UserListContext";

interface FriendButtonProps extends ButtonProps {
  friend: User;
}

export const FriendAcceptButton: React.FC<FriendButtonProps> = ({
  friend,
  children,
  ...props
}) => {
  const { addToast } = useToasts();
  const { users, setUsers } = useUserList();

  const acceptFriendship = () => {
    fetch(`http://paralibrary.digital/api/friends/${friend.id}`, {
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
        if (response.ok) {
          setUsers(
            users.map((user) =>
              user.id !== friend.id ? user : { ...friend, status: "friends" }
            )
          );
          addToast({
            header: "Friend added!",
            body: `You are now friends with ${friend.name}`,
            type: "success",
          });
        } else {
          throw Error;
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({
          header: "Could not add friend",
          body: "Something went wrong. Please try again in a few moments",
          type: "error",
        });
      });
  };

  return (
    <Button variant="primary" onClick={acceptFriendship} size="sm" {...props}>
      {children ?? "Accept"}
    </Button>
  );
};

export const FriendRejectButton: React.FC<FriendButtonProps> = ({
  friend,
  children,
  ...props
}) => {
  const { addToast } = useToasts();
  const { users, setUsers } = useUserList();

  const rejectFriendship = () => {
    fetch(`http://paralibrary.digital/api/friends/${friend.id}`, {
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
        if (response.ok) {
          setUsers(
            users.map((user) =>
              user.id !== friend.id ? user : { ...friend, status: null }
            )
          );
        } else {
          throw Error;
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({
          header: "Action could not be completed",
          body: "Something went wrong. Please try again in a few moments",
          type: "error",
        });
      });
  };

  return (
    <Button
      variant="outline-danger"
      onClick={rejectFriendship}
      size="sm"
      {...props}
    >
      {children ?? "Reject"}
    </Button>
  );
};

export const FriendAcceptReject: React.FC<FriendButtonProps> = ({ friend }) => {
  return (
    <>
      <FriendAcceptButton friend={friend}>Accept</FriendAcceptButton>
      <FriendRejectButton friend={friend}>Reject</FriendRejectButton>
    </>
  );
};

export const FriendRequestButton: React.FC<FriendButtonProps> = ({
  friend,
  children,
}) => {
  const { addToast } = useToasts();
  const { users, setUsers } = useUserList();

  const requestFriendship = useCallback(() => {
    fetch(`http://paralibrary.digital/api/friends/${friend.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...friend, action: "request" }),
    })
      .then((response) => {
        if (response.ok) {
          setUsers(
            users.map((user) =>
              user.id !== friend.id ? user : { ...friend, status: "requested" }
            )
          );
          addToast({
            header: "Friend request sent!",
            body: "This user will appear in your friends list if they accept",
          });
        } else {
          throw Error;
        }
      })
      .catch((error) => {
        console.error("error: " + error);
        addToast({
          header: "Error sending friend request",
          body: "Could not reach the server. Please try again in a few moments",
          type: "error",
        });
      });
  }, [friend, addToast, users, setUsers]);

  return (
    <Button size="sm" onClick={requestFriendship}>
      {children ?? "Send friend request"}
    </Button>
  );
};
