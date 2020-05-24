import React from "react";
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";

import PageLayout from "./PageLayout";

const FlowDown = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const ErrorPage: React.FC = () => {
  return (
    <PageLayout header={<h1>Fahrenheit 404</h1>} loaded>
      <FlowDown>
        It seems this page does not exist.
        <Alert variant="primary">
          <span>
            “Would you tell me, please, which way I ought to go from here?”
            <br />
            “That depends a good deal on where you want to get to,” said the
            Cat. <br />
            “I don’t much care where—” said Alice. <br /> “Then it doesn’t
            matter which way you go,” said the Cat.
          </span>
          <hr />
          <span>
            – Lewis Carrol, <em>Alice's Adventures in Wonderland</em>
          </span>
        </Alert>
      </FlowDown>
    </PageLayout>
  );
};

export default ErrorPage;
