import React from "react";
import { User } from "./ourtypes";
import FriendshipAcceptButton, {
  FriendshipChangeEvent,
} from "./FriendshipAcceptButton";
import FriendshipRejectButton from "./FriendshipRejectButton";

interface ButtonGroupProps {
  rowitem?: User;
  onAccept?: (event: FriendshipChangeEvent) => void;
  onReject?: (event: FriendshipChangeEvent) => void;
}

const AcceptRejectGroup: React.FC<ButtonGroupProps> = ({
  rowitem: friend,
  onAccept,
  onReject,
}) => {
  return (
    <>
      <FriendshipAcceptButton rowitem={friend} onAccept={onAccept}>
        Accept
      </FriendshipAcceptButton>
      <FriendshipRejectButton rowitem={friend} onReject={onReject}>
        Reject
      </FriendshipRejectButton>
    </>
  );
};

export default AcceptRejectGroup;
