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
                  <Link to={"/library"}>My Library</Link>
                  <Link to={"/friends"}>Friends</Link>
                  <Link to={"/loans"}>Loans</Link>
                  <Link to={"/settings"}>Settings</Link>
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
