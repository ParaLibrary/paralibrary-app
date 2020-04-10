import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import LibraryPage from "./LibraryPage";
import LandingPage from "./LandingPage";
import FriendsPage from "./FriendsPage";
import LoansPage from "./LoansPage";
import SettingsPage from "./SettingsPage";
import NavBar from "./NavBar";

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
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <PageLayout>
          <NavBar
            navItems={[
              { name: "My Library", link: "/library" },
              { name: "Friends", link: "/friends" },
              { name: "Loans", link: "/loans" },
              { name: "Settings", link: "/settings" },
            ]}
          />
          <MainContent>
            <Route path="/library/:id" component={LibraryPage}></Route>
            <Route path="/friends" component={FriendsPage}></Route>
            <Route path="/loans" component={LoansPage}></Route>
            <Route path="/settings" component={SettingsPage}></Route>
          </MainContent>
        </PageLayout>
      </Switch>
    </Router>
  );
};

export default App;
