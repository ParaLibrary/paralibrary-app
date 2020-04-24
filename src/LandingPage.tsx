import React from "react";
import styled from "styled-components";
import { GoogleLogin } from 'react-google-login';

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
  return (
    <LandingLayout>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com"/>
      <Logo src="/images/logo-icon-black.png" alt=""/>
      <TitleText src="/images/logo-text-black.png"/>
      <SignIn>
        <GoogleLogin
          clientId=""
          buttonText="Sign in with Google"
          onSuccess={() => {}}
          onFailure={() => {}}
          cookiePolicy={'single_host_origin'}
        />
      </SignIn>
    </LandingLayout>
  );
};

export default LandingPage;
