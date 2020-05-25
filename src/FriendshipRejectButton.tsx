import React from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import { FriendshipChangeEvent } from "./FriendshipAcceptButton";
import { User } from "./ourtypes";
import { useToasts } from "./ToastProvider";

interface RejectButtonProps extends ButtonProps {
  rowitem?: User;
  onReject?: () => void;
}

const FriendshipRejectButton: React.FC<RejectButtonProps> = ({
  rowitem: friend,
  onReject,
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
      onClick={RejectFriendship}
      size={size}
    >
      {children}
    </Button>
  );
};

export default FriendshipRejectButton;
