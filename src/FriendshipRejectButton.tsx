import React from "react";
import { Button } from "react-bootstrap";
import { FriendshipChangeEvent } from "./FriendshipAcceptButton";
import { User } from "./ourtypes";
import { useToasts } from "./ToastProvider";

interface RejectButtonProps {
  rowitem?: User;
  onReject?: (event: FriendshipChangeEvent) => void;
}

const FriendshipRejectButton: React.FC<RejectButtonProps> = ({
  rowitem: friend,
  onReject,
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
      .then(onReject)
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
      size="sm"
      onClick={RejectFriendship}
    >
      Reject
    </Button>
  );
};

export default FriendshipRejectButton;
