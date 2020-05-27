import React, { useCallback, useContext } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import ConfirmationContext from "./ConfirmationContext";
import { AuthContext } from "./AuthContextProvider";
import { User } from "./ourtypes";
import { useToasts } from "./ToastProvider";

interface DABProps {
  user: User;
  signature: string;
  isLoaded: boolean;
}

const DeleteAccountButton: React.FC<DABProps> = ({
  user,
  signature,
  isLoaded,
}) => {
  const { logout } = useContext(AuthContext);
  const requestConfirm = useContext(ConfirmationContext);
  const { addToast } = useToasts();
  const deleteAccount = useCallback(() => {
    requestConfirm(
      () => {
        console.log(user);
        fetch(`http://paralibrary.digital/api/users/${user.id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res: Response) => {
            if (res.ok) {
              logout();
            } else {
              throw Error();
            }
          })
          .catch((error) => {
            console.error(error);
            addToast({
              header: "Could not delete account",
              body: "Please refresh the page and try again in a few moments",
              type: "error",
            });
          });
      },
      {
        title: "Delete Account",
        body:
          "Are you sure you want to delete you entire account? This action is not reversible.",
      }
    );
  }, [user, requestConfirm, logout, addToast]);

  return (
    <Collapse in={isLoaded && signature === user.name}>
      <Button variant="danger" onClick={deleteAccount}>
        Delete Account
      </Button>
    </Collapse>
  );
};

export default DeleteAccountButton;
