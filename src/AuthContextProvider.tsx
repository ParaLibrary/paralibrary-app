import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

export interface Credential {
  authenticated: boolean;
  userId?: number;
}

const initialCredentials: Credential = {
  authenticated: false,
  userId: undefined,
};

export interface AuthInterface {
  credential: Credential;
  login(newAuthState: Credential): void;
  logout(): void;
}

export const AuthContext = createContext<AuthInterface>({
  credential: initialCredentials,
  login: () => {},
  logout: () => {},
});

function AuthContextProvider(props: any) {
  const [authData, setAuthData] = useState(initialCredentials);
  const authKey = "auth";

  useEffect(() => {
    const currentAuthData = Cookie.get(authKey);
    if (currentAuthData) {
      const data: Credential = JSON.parse(currentAuthData);
      setAuthData(data);
    }
  }, []);

  const onLogout = () => {
    Cookie.remove(authKey);
    setAuthData(initialCredentials);
  };

  const onLogin = (newCredential: Credential) => {
    Cookie.set(authKey, JSON.stringify(newCredential)); // Cookies can be set to expire with the 'expires' option
    setAuthData(newCredential);
  };

  const value: AuthInterface = {
    credential: authData,
    login: onLogin,
    logout: onLogout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export default AuthContextProvider;
