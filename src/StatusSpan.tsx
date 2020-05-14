import React from "react";
import styled from "styled-components";

import { Loan, LoanStatus } from "./ourtypes";

type StatusMessages = { [status in LoanStatus]?: string };

interface StatusSpanProps extends StatusMessages {
  rowitem?: Loan;
}

const StatusSpan: React.FC<StatusSpanProps> = ({
  rowitem,
  ...messageLookup
}) => {
  return <span>{rowitem && messageLookup[rowitem.status]}</span>;
};

export default StatusSpan;
