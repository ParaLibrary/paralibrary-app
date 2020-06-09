import React from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";

const HeaderContainer = styled.div`
  display: flex;
  max-width: 100%;
`;

const UserImage = styled(Image)`
  display: inline;
  float: left;
  object-fit: contain;
  height: 48px;
  width: auto;
  margin-right: 16px;
`;

interface LHProps {
  name?: string;
  picture?: string;
}

const LibraryHeader: React.FC<LHProps> = ({ name, picture }) => {
  return (
    <HeaderContainer>
      <UserImage src={picture || "./images/defaultAvatar.jpg"} rounded />
      <h2>{!name ? "My" : `${name}'s`} Library</h2>
    </HeaderContainer>
  );
};

export default LibraryHeader;
