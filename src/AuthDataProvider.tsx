import React, { createContext } from "react";

export interface AuthInterface {
  authenticated: boolean;
  setAuthenticated(newAuthState: boolean): void;
}

const AuthContext = createContext<AuthInterface>({
  authenticated: false,
  setAuthenticated: () => {},
});

/**
 * TODO: Rewrite as functional component. Definitely got this from Stack Overflow
 */
export class AuthContextProvider extends React.Component {
  setAuthenticated = (newAuthState: boolean) => {
    console.log("NEW STATE: " + newAuthState);
    this.setState({ authenticated: newAuthState });
    localStorage.setItem("AuthState", "true");
  };

  state = {
    authenticated: localStorage.getItem("AuthState") === "true",
    setAuthenticated: this.setAuthenticated,
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthContextConsumer = AuthContext.Consumer;
