import React from "react";

import { Link } from "react-router-dom";
import { User } from "./ourtypes";

interface UserDisplayProps {
  data?: User;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ data: user }) => {
  return <Link to={`library/${user?.id}`}>{user?.name}</Link>;
};

export default UserDisplay;
