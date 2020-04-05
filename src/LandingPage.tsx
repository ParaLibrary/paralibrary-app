import React from "react";

// Here's an example of how to TS with React functional components
interface LandingPageProps {
  id: string;
  otherstuff: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ id, otherstuff }) => {
  return <div>Hello Wooorld!</div>;
};

export default LandingPage;
