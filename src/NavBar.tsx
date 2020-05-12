import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useGoogleLogout, UseGoogleLogoutProps } from "react-google-login";
import { AuthContext } from "./AuthContextProvider";

const NavBarLayout = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;

  height: fit-content;
  width: auto;
  padding: 16px;
  @media screen and (min-width: 480px) {
    height: 100%;
    align-items: flex-start;
    flex-flow: column nowrap;
    justify-content: start;
  }
`;

const LinkWrapper = styled.div`
  @media screen and (min-width: 480px) {
    padding-bottom: 16px;
  }
`;

const LogoutButton = styled(Button)`
  margin-top: auto;
`;

const NavBar: React.FC = ({ children }) => {
  const auth = useContext(AuthContext);

  const logoutProps: UseGoogleLogoutProps = {
    clientId:
      "631703414652-navvamq2108qu88d9i7bo77gn2kqsi40.apps.googleusercontent.com",
    onLogoutSuccess: logoutSuccessHandler,
    onFailure: logoutFailureHandler,
  };

  const { signOut } = useGoogleLogout(logoutProps);

  function logoutSuccessHandler() {
    return fetch(`http://paralibrary.digital/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    })
      .then(async (response) => {
        if (response.status === 200) {
          auth.logout();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function logoutFailureHandler() {
    console.error("Logout failure");
  }

  return (
    <NavBarLayout>
      {React.Children.map(children, (child) => (
        <LinkWrapper>{child}</LinkWrapper>
      ))}
      <LogoutButton onClick={signOut} variant="outline-secondary" size="sm">
        Logout
      </LogoutButton>
    </NavBarLayout>
  );
};

export default NavBar;
