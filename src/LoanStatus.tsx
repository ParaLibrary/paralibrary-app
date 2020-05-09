import React, { useCallback } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Loan } from "./ourtypes";

const NoWrapButton = styled(Button)`
  white-space: nowrap;
`;

interface LoanStatusProps {
  data?: Loan;
}

const LoanStatus: React.FC<LoanStatusProps> = ({ data }) => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push("/loans");
  }, [history]);
  if (!data || data.status === "returned") {
    return (
      <NoWrapButton block size="sm" variant="dark" disabled>
        In Library
      </NoWrapButton>
    );
  } else if (data.status === "pending") {
    return (
      <NoWrapButton block size="sm" variant="primary" onClick={handleClick}>
        Requested
      </NoWrapButton>
    );
  } else if (data.status === "accepted") {
    return (
      <NoWrapButton block size="sm" variant="warning" onClick={handleClick}>
        Outgoing
      </NoWrapButton>
    );
  } else {
    return (
      <NoWrapButton block size="sm" variant="success" onClick={handleClick}>
        Loaned Out
      </NoWrapButton>
    );
  }
};

export default LoanStatus;
