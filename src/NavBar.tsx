import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useGoogleLogout, UseGoogleLogoutProps } from "react-google-login";
import { AuthContext } from "./AuthContextProvider";

const NavBarLayout = styled.nav`
  top: 0;
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  z-index: 1;
  flex: 0 0 auto;

  background-color: white;
  border-bottom: 0.1rem solid #ececec;

  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  align-items: baseline;

  height: fit-content;
  width: auto;
  padding: 16px;

  > :not(:last-child) {
    margin-right: 16px;
  }

  @media screen and (min-width: 480px) {
    border: none;
    height: 100vh;
    align-items: flex-start;
    flex-flow: column nowrap;
    justify-content: start;
    > :not(:last-child) {
      margin-right: 0px;
      margin-bottom: 16px;
    }
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
    return fetch(`http://localhost:8080/api/auth/logout`, {
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
      {children}
      <LogoutButton onClick={signOut} variant="outline-secondary" size="sm">
        Logout
      </LogoutButton>
    </NavBarLayout>
  );
};

export default NavBar;
