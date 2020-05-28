import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import AuthContextProvider from "./AuthContextProvider";
import LibraryPage from "./LibraryPage";
import FriendLibraryPage from "./FriendLibraryPage";
import LandingPage from "./LandingPage";
import FriendsPage from "./FriendsPage";
import LoansPage from "./LoansPage";
import SettingsPage from "./SettingsPage";
import NavBar from "./NavBar";
import theme from "./theme";
import ToastContextProvider from "./ToastProvider";
import ErrorPage from "./ErrorPage";

const PageHolder = styled.div`
  display: flex;
  flex-flow: column;
  @media screen and (min-width: 480px) {
    flex-flow: row;
  }
  height: fit-content;
`;

const NavLink = styled(Link)`
  padding: 10px;
  border-radius: 3px;

  :hover {
    transition-duration: 0.2s;
    box-shadow: 0 0 0pt 1pt rgba(78, 162, 245, 0.7);
    text-decoration: none;
  }

  @media screen and (min-width: 480px) {
    width: 100%;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContextProvider>
        <AuthContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage}></Route>
              <PageHolder>
                <NavBar>
                  <NavLink to={"/library"}>My Library</NavLink>
                  <NavLink to={"/friends"}>Friends</NavLink>
                  <NavLink to={"/loans"}>Loans</NavLink>
                  <NavLink to={"/settings"}>Settings</NavLink>
                </NavBar>
                <Switch>
                  <Route path="/library" exact>
                    <LibraryPage />
                  </Route>
                  <Route path="/library/:id">
                    <FriendLibraryPage />
                  </Route>
                  <Route path="/friends">
                    <FriendsPage />
                  </Route>
                  <Route path="/loans">
                    <LoansPage />
                  </Route>
                  <Route path="/settings">
                    <SettingsPage />
                  </Route>
                  <Route>
                    <ErrorPage />
                  </Route>
                </Switch>
              </PageHolder>
            </Switch>
          </Router>
        </AuthContextProvider>
      </ToastContextProvider>
    </ThemeProvider>
  );
};

export default App;
