import React from "react";
import styled from "styled-components";

import { User } from "./ourtypes";
import { Role } from "./List";
import UserDisplay from "./UserDisplay";
import FriendStatusButton from "./FriendManagers";

const UserCard: React.FC<User & Role> = (userAndRole) => {
  return (
    <UserDiv>
      <Main>
        <NBM>
          <UserDisplay data={userAndRole} />
        </NBM>
        {userAndRole.status !== "friends" && (
          <ActionPanel>
            <FriendStatusButton friend={userAndRole} />
          </ActionPanel>
        )}
      </Main>
    </UserDiv>
  );
};

const UserDiv = styled.div`
  background: white;
  border: 0.1rem solid #ececec;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px;
  max-width: 640px;
  display: flex;
  flex-flow: column nowrap;
  > p {
    margin-bottom: 0px;
  }
`;

const Main = styled.div<{ hideActionsOnSmall?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto max(25%, 90px);
  @media screen and (min-width: ${({ theme }) => theme.smallViewport}) {
    display: auto;
  }
  gap: 0px 16px;
`;

const ActionPanel = styled.div<{ hideActionsOnSmall?: boolean }>`
  display: ${({ hideActionsOnSmall: hide }) => (!hide ? "flex" : "none")};
  @media screen and (min-width: ${({ theme }) => theme.smallViewport}) {
    display: flex;
  }
  flex-flow: column nowrap;
  justify-content: start;
  align-items: stretch;
  > :not(:last-child) {
    margin: 0px 0px 4px 0px;
  }
`;

const NBM = styled.div`
  > :last-child {
    margin-bottom: 0px;
  }
`;

export default UserCard;
