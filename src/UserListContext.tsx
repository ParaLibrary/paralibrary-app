import React, { useContext } from "react";

import { User } from "./ourtypes";

interface UserListContext {
  users: User[];
  setUsers: (users: User[]) => void;
}

const defaultValues: UserListContext = {
  users: [],
  setUsers: (users: User[]) => {},
};

const UserListContext = React.createContext<UserListContext>(defaultValues);

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
