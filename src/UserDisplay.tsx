import React from "react";

import { Link } from "react-router-dom";
import { User } from "./ourtypes";
import Image from "react-bootstrap/Image";
import styled from "styled-components";

interface UserDisplayProps {
  data?: User;
  hideAvatar?: boolean;
  hideName?: boolean;
  height?: number;
}

const UserContainer = styled(Link)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: ${(props: UserDisplayProps) => props.height}px;
  object-fit: contain;
`;

const UserLabel = styled.span`
  margin-left: 10px;
`;

const UserImage = styled(Image)`
  display: inline-block;
  object-fit: contain;
  height: 100%;
  max-height: 96px;
  max-width: 96px;
`;

const UserDisplay: React.FC<UserDisplayProps> = ({
  data: user,
  hideAvatar,
  hideName,
  height,
}) => {
  return (
    <UserContainer to={`library/${user?.id}`} height={height ?? 40}>
      {!hideAvatar && (
        <UserImage
          src={
            user && user.picture ? user.picture : "./images/defaultAvatar.jpg"
          }
          rounded
        />
      )}
      {!hideName && <UserLabel>{user?.name}</UserLabel>}
    </UserContainer>
  );
};

export default UserDisplay;
