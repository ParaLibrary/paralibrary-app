import React, { useCallback, useEffect, Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import FriendshipResponseButtons from "./FriendshipResponseButtons";
import styled from "styled-components";

import { User } from "./ourtypes";

interface FRBProps {
  rowitem?: User;
  onClick: Dispatch<SetStateAction<User | undefined>>;
}

const PaddedDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 30px;
`;

const FriendshipRequestButton: React.FC<FRBProps> = ({
  rowitem: friend,
  onClick,
}) => {
  const requestFriendship = useCallback(() => {
    if (!friend) {
      return;
    }
    onClick({ ...friend, status: "requested" });
    fetch(`http://paralibrary.digital/api/friends/${friend.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...friend, action: "request" }),
    }).catch((error) => console.log(error));
  }, [friend]);

  if (!friend) {
    return <></>;
  }

  return (
    <PaddedDiv>
      {friend.status == null && (
        <Button onClick={requestFriendship}>Send friend request</Button>
      )}
      {friend.status === "friends" && (
        <Button variant="success" disabled>
          Friends
        </Button>
      )}
      {friend.status === "requested" && (
        <Button variant="info" disabled onClick={requestFriendship}>
          Requested
        </Button>
      )}
      {friend.status === "waiting" && (
        <div>
          <div>{friend.name} wants to be friends with you!</div>
          <FriendshipResponseButtons rowitem={friend} />
        </div>
      )}
    </PaddedDiv>
  );
};

export default FriendshipRequestButton;
