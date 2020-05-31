import React, { useContext, useMemo, useCallback } from "react";

import { User } from "./ourtypes";

interface UserListContext {
  users: User[];
  setUsers: (users: User[]) => void;
}

const defaultValues: UserListContext = {
  users: [],
  setUsers: (users: User[]) => {},
};

interface SingleUserContext {
  user: User;
  setUser: (user: User) => void;
}

const UserListContext = React.createContext<UserListContext>(defaultValues);

export const SingleUserProvider: React.FC<SingleUserContext> = ({
  user,
  setUser,
  children,
}) => {
  const friends = useMemo(() => [user], [user]);
  const setFriends = useCallback(
    (friendList) => {
      friendList.length > 0 && setUser(friendList[0]);
    },
    [setUser]
  );

  return (
    <UserListContext.Provider value={{ users: friends, setUsers: setFriends }}>
      {children}
    </UserListContext.Provider>
  );
};

export const useUserList = () => {
  const ctx = useContext(UserListContext);

  if (!ctx) {
    throw Error(
      "The `useUserList` hook must be called from a descendent of the `UserListContext.Provider`"
    );
  }

  return {
    users: ctx.users,
    setUsers: ctx.setUsers,
  };
};

export default UserListContext;
