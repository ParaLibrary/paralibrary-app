import React, { useCallback, useContext } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import ConfirmationContext from "./ConfirmationContext";
import { AuthContext } from "./AuthContextProvider";
import { User } from "./ourtypes";

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
  const deleteAccount = useCallback(() => {
    requestConfirm(
      () => {
        console.log(user);
        fetch(`http://localhost:8080/api/users/${user.id}`, {
          method: "DELETE",
          credentials: "include",
        }).then((res: Response) => {
          if (res.ok) {
            logout();
          }
        });
      },
      {
        title: "Delete Account",
        body:
          "Are you sure you want to delete you entire account? This action is not reversible.",
      }
    );
  }, [user, requestConfirm, logout]);

  return (
    <Collapse in={isLoaded && signature === user.name}>
      <Button variant="danger" onClick={deleteAccount}>
        Delete Account
      </Button>
    </Collapse>
  );
};

export default DeleteAccountButton;
