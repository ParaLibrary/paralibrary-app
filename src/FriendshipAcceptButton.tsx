import React from "react";
import { Button } from "react-bootstrap";
import { User } from "./ourtypes";
import { useToasts } from "./ToastProvider";

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
  const { addToast } = useToasts();

  function AcceptFriendship() {
    if (!friend) {
      throw new Error("Row lacks valid data");
    }

    return fetch(`http://paaralibrary.digital/api/friends/${friend.id}`, {
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
      .then(onAccept)
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
