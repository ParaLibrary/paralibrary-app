import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

export interface Credential {
  authenticated: boolean;
  userId?: string;
}

const initialCredentials: Credential = {
  authenticated: false,
  userId: undefined,
};

export interface AuthInterface {
  credential: Credential;
  login(newAuthState: Credential, maxAge: number): void;
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
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    const currentAuthData = Cookie.get(authKey);
    if (currentAuthData) {
      const data: Credential = JSON.parse(currentAuthData);
      setAuthData(data);
    }
    setIsSetupComplete(true);
  }, []);

  const onLogout = () => {
    Cookie.remove(authKey);
    setAuthData(initialCredentials);
  };

  const onLogin = (newCredential: Credential, maxAge: number) => {
    Cookie.remove(authKey);
    Cookie.set(authKey, JSON.stringify(newCredential), {
      expires: msToDays(maxAge),
    });
    setAuthData(newCredential);
  };

  function msToDays(days: number) {
    return days / (24 * 60 * 60 * 1000);
  }

  const value: AuthInterface = {
    credential: authData,
    login: onLogin,
    logout: onLogout,
  };

  return isSetupComplete ? (
    <AuthContext.Provider value={value} {...props} />
  ) : (
    <></>
  );
}

export default AuthContextProvider;
