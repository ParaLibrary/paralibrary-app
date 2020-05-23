import React from "react";
import PageLayout from "./PageLayout";

import Alert from "react-bootstrap/Alert";

const ErrorPage: React.FC = () => {
  return (
    <PageLayout header={<h1>Fahrenheit 404</h1>} loaded>
      Seems like there's nothing much to see here.
    </PageLayout>
  );
};

export default ErrorPage;
