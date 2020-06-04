import React, { useContext, useState, useEffect } from "react";
import { useGoogleLogout, UseGoogleLogoutProps } from "react-google-login";
import { AuthContext } from "./AuthContextProvider";
import { slide as Hamburger } from "react-burger-menu";
import debounce from "lodash.debounce";
import {
  HamburgerWrapper,
  MobileTextLogo,
  MobileLogo,
  MobileNavBar,
  NavBarLayout,
  LogoutButton,
  Logo,
} from "./NavBarStyles";

const NavBar: React.FC = ({ children }) => {
  const auth = useContext(AuthContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function updateScreenWidth() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", debounce(updateScreenWidth, 200));
  }, []);

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

  return screenWidth < 480 ? (
    <>
      <HamburgerWrapper>
        <Hamburger width={200}>
          <MobileLogo src="/images/logo-icon-black.png" />
          {children}
          <LogoutButton onClick={signOut} variant="outline-secondary" size="sm">
            Logout
          </LogoutButton>
        </Hamburger>
      </HamburgerWrapper>
      <MobileNavBar>
        <MobileTextLogo src="/images/logo-text-black.png" href="/library" />
      </MobileNavBar>
    </>
  ) : (
    <NavBarLayout>
      <a href="/library">
        <Logo src="/images/logo-icon-black.png" />
      </a>
      {children}
      <LogoutButton onClick={signOut} variant="outline-secondary" size="sm">
        Logout
      </LogoutButton>
    </NavBarLayout>
  );
};

export default NavBar;
