import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { NavItem } from "./ourtypes";

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

interface NavBarProps {
  navItems: NavItem[];
}

const NavBar: React.FC<NavBarProps> = ({ navItems }) => {
  return (
    <NavBarLayout>
      {navItems.map((item: NavItem) => (
        <LinkWrapper>
          <Link to={item.link}>{item.name}</Link>
        </LinkWrapper>
      ))}
    </NavBarLayout>
  );
};

export default NavBar;
