import React from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";

const HeaderContainer = styled.div`
  display: block;
  margin-bottom: 16px;
  max-width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.smallViewport}) {
    display: grid;
    grid-template-columns: min-content auto;
    grid-column-gap: 16px;
    margin-bottom: 0px;
  }
`;

const UserImage = styled(Image)`
  display: none;
  object-fit: contain;
  height: 100%;
  max-height: 96px;
  max-width: 96px;
  @media screen and (min-width: ${({ theme }) => theme.smallViewport}) {
    display: block;
  }
`;

interface LHProps {
  name?: string;
  picture?: string;
}

const LibraryHeader: React.FC<LHProps> = ({ name, picture }) => {
  return (
    <HeaderContainer>
      <UserImage src={picture || "./images/defaultAvatar.jpg"} rounded />
      <h1>{!name ? "My" : `${name}'s`} Library</h1>
    </HeaderContainer>
  );
};

export default LibraryHeader;
