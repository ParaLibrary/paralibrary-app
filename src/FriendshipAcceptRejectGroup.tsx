import React from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import { User } from "./ourtypes";
import { useToasts } from "./ToastProvider";

interface ButtonGroupProps {
  rowitem?: User;
  onAccept?: () => void;
  onReject?: () => void;
}

const AcceptRejectGroup: React.FC<ButtonGroupProps> = ({
  rowitem: friend,
  onAccept,
  onReject,
}) => {
  return (
    <>
      <FriendshipAcceptButton rowitem={friend} onAccept={onAccept} />
      <FriendshipRejectButton rowitem={friend} onReject={onReject}>
        Reject
      </FriendshipRejectButton>
    </>
  );
};

interface FriendButtonProps extends ButtonProps {
  rowitem?: User;
  onSuccess?: () => void;
}

const FriendshipAcceptButton: React.FC<FriendButtonProps> = ({
  rowitem: friend,
  onSuccess,
}) => {
  const { addToast } = useToasts();

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
        if (response.ok) {
          addToast({
            header: "Friend added!",
            body: `You are now friends with ${friend.name}`,
            type: "success",
          });
        }
        return {
          successful: response.ok,
          id: friend.id,
        };
      })
      .then(onSuccess)
      .catch((error) => {
        console.error(error);
        addToast({
          header: "Could not add friend",
          body: "Something went wrong. Please try again in a few moments",
          type: "error",
        });
      });
  }

  return (
    <Button type="button" variant="primary" onClick={AcceptFriendship}>
      Accept
    </Button>
  );
};

export const FriendshipRejectButton: React.FC<FriendButtonProps> = ({
  rowitem: friend,
  onSuccess,
  children,
  size,
}) => {
  const { addToast } = useToasts();

  function RejectFriendship() {
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
        action: "reject",
      }),
    })
      .then((response) => {
        return {
          successful: response.ok,
          id: friend.id,
        };
      })
      .then(onSuccess)
      .catch((error) => {
        console.error(error);
        addToast({
          header: "Action could not be completed",
          body: "Something went wrong. Please try again in a few moments",
          type: "error",
        });
      });
  }

  return (
    <Button
      type="button"
      variant="outline-danger"
      onClick={RejectFriendship}
      size={size}
    >
      {children}
    </Button>
  );
};

export default AcceptRejectGroup;
