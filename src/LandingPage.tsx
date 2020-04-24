import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";

const LandingLayout = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 7fr 1fr;
  grid-template-rows: 400px auto;
  grid-template-areas:
    ". header ."
    ". main. "
`;

const ImageContainer = styled.div`
  grid-area: header;
  max-width: 1080px;
`;

const SignInContainer = styled.div`
  grid-area: main;
`;

const LandingPage: React.FC = () => {
  return (
    <LandingLayout>
      <ImageContainer>
        <Image src="/images/logo-full-black.png" fluid/>
      </ImageContainer>
      <SignInContainer>
        Google
      </SignInContainer>
    </LandingLayout>
  );
};

export default LandingPage;
