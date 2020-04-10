import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LibraryPage from "./LibraryPage";
import LandingPage from "./LandingPage";
import FriendsPage from "./FriendsPage";
import LoansPage from "./LoansPage";
import SettingsPage from "./SettingsPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/library/:id" component={LibraryPage}></Route>
        <Route path="/friends" component={FriendsPage}></Route>
        <Route path="/loans" component={LoansPage}></Route>
        <Route path="/settings" component={SettingsPage}></Route>
      </Switch>
    </Router>
  );
};

export default App;
