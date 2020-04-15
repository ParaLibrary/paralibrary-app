import React from "react";
import styled from "styled-components";

const NavBarLayout = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: flex-start;

  height: fit-content;
  width: auto;
  padding: 16px;
  @media screen and (min-width: 480px) {
    flex-flow: column nowrap;
    justify-content: start;
  }
`;

const LinkWrapper = styled.div`
  @media screen and (min-width: 480px) {
    padding-bottom: 16px;
  }
`;

const NavBar: React.FC = ({ children }) => {
  return (
    <NavBarLayout>
      {React.Children.map(children, (child) => (
        <LinkWrapper>{child}</LinkWrapper>
      ))}
    </NavBarLayout>
  );
};

export default NavBar;
