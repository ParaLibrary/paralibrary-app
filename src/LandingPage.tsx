import React, { useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { AuthContext } from "./AuthContextProvider";

const LandingLayout = styled.div`
  display: grid;
  place-items: center;

  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: 200px 40px auto;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-areas:
    ". logo ."
    ". title ."
    ". main . ";

  @media screen and (min-width: 480px) {
    place-items: center;
    grid-template-columns: 1fr 2fr 9fr 1fr;
    grid-template-rows: 600px auto;
    grid-template-areas:
      ". logo title ."
      ". main main . ";
  }
`;

const Logo = styled.img`
  grid-area: logo;
  align-self: end;
  width: 50%;
  display: block;
  object-fit: contain;

  @media screen and (min-width: 480px) {
    align-self: center;
    grid-area: logo;
    width: 80%;
    display: block;
  }
`;

const TitleText = styled.img`
  grid-area: title;
  align-self: start;
  width: 100%;
  display: block;
  object-fit: contain;

  @media screen and (min-width: 480px) {
    grid-area: title;
    align-self: center;
    width: 100%;
    display: block;
    object-fit: contain;
  }
`;

const SignIn = styled.div`
  grid-area: main;
`;

const LandingPage: React.FC = () => {
  const auth = useContext(AuthContext);

  function loginSuccessHandler(
    googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) {
    let onlineResponse = googleResponse as GoogleLoginResponse;
    if (!onlineResponse) {
      // Not supported yet
      return;
    }

    const options = {
      credentials: "include" as const,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `idtoken=${onlineResponse.tokenId}`,
    };
    return fetch(`http://paralibrary.digital/api/login`, options)
      .then(async (response) => {
        if (response.status === 200) {
          let json = await response.json();
          auth.login({ authenticated: true, userId: json.userId }, json.maxAge);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const loginFailureHandler = (error: GoogleLoginResponse) => {
    console.log(error);
  };

  return (
    <AuthContext.Consumer>
      {(context) => {
        if (context === undefined) {
          console.error(
            "The AuthContext Consumer must be used inside an AuthContextProvider"
          );
        }
        if (context.credential.authenticated) {
          return <Redirect to="/library" />;
        }
        return (
          <LandingLayout>
            <Logo src="/images/logo-icon-black.png" alt="" />
            <TitleText src="/images/logo-text-black.png" />
            <SignIn>
              <GoogleLogin
                clientId="631703414652-navvamq2108qu88d9i7bo77gn2kqsi40.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={loginSuccessHandler}
                onFailure={loginFailureHandler}
                cookiePolicy={"single_host_origin"}
              />
            </SignIn>
          </LandingLayout>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default LandingPage;
