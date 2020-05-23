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
import ErrorPage from "./ErrorPage";

const PageLayout = styled.div`
  display: flex;
  flex-flow: column;
  @media screen and (min-width: 480px) {
    flex-flow: row;
  }
  height: 100vh;
  flex: 0 1 auto;
`;

const MainContent = styled.div`
  flex: 1 1 auto;
  height: 100%;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
            <PageLayout>
              <NavBar>
                <Link to={"/library"}>My Library</Link>
                <Link to={"/friends"}>Friends</Link>
                <Link to={"/loans"}>Loans</Link>
                <Link to={"/settings"}>Settings</Link>
              </NavBar>
              <MainContent>
                <Route path="/library" exact component={LibraryPage}></Route>
                <Route
                  path="/library/:id"
                  component={FriendLibraryPage}
                ></Route>
                <Route path="/friends" component={FriendsPage}></Route>
                <Route path="/loans" component={LoansPage}></Route>
                <Route path="/settings" component={SettingsPage}></Route>
                <Route path="*" component={ErrorPage} />
              </MainContent>
            </PageLayout>
          </Switch>
        </Router>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
