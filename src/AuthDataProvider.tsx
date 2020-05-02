import React, { createContext, useState, useEffect, useMemo } from "react";

export interface Credential {
  authenticated: boolean;
  userId?: number;
  sessionId?: number;
}

const initialCredentials: Credential = {
  authenticated: false,
  userId: undefined,
  sessionId: undefined,
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
    const currentAuthData = sessionStorage.getItem(authKey);
    if (currentAuthData) {
      const data: Credential = JSON.parse(currentAuthData);
      setAuthData(data);
    }
  }, []);

  const onLogout = () => setAuthData(initialCredentials);

  const onLogin = (newCredential: Credential) => {
    sessionStorage.setItem(authKey, JSON.stringify(newCredential));
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
