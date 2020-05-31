import React, { useState, useEffect, useMemo } from "react";
import { User } from "./ourtypes";
import { toUser } from "./mappers";
import PageLayout from "./PageLayout";
import FriendSearchBar from "./FriendSearchBar";
import List from "./List";
import UserCard from "./UserCard";
import UserListContext from "./UserListContext";

const FriendsPage: React.FC = () => {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<User[]>([]);
  const [friendSuggestions, setFriendSuggestions] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://paralibrary.digital/api/friends", { credentials: "include" })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setFriends(result.map(toUser));
        },
        (error) => {
          console.log(error);
          setError(true);
        }
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    fetch("http://paralibrary.digital/api/friends/suggested", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setFriendSuggestions(result.map(toUser));
        },
        (error) => {
          console.log(error);
          setError(true);
        }
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  const incomingFriendRequests: User[] = useMemo(
    () => friends.filter((friend: User) => friend.status === "waiting"),
    [friends]
  );

  const currentFriends: User[] = useMemo(
    () => friends.filter((friend: User) => friend.status === "friends"),
    [friends]
  );

  const outgoingFriendRequests: User[] = useMemo(
    () => friends.filter((friend: User) => friend.status === "requested"),
    [friends]
  );

  return (
    <PageLayout
      header={<h1>My Friends</h1>}
      sidebar={
        <List
          title={<h3>People you may know</h3>}
          component={UserCard}
          items={friendSuggestions}
          userRole="owner"
          placeholder={<span>No suggestions right now! Check back later</span>}
        ></List>
      }
      error={error}
      loaded={isLoaded}
    >
      <FriendSearchBar />

      <UserListContext.Provider
        value={{ users: friends, setUsers: setFriends }}
      >
        <List
          title={<h3>Waiting for a response</h3>}
          component={UserCard}
          items={outgoingFriendRequests}
          userRole="owner"
        />
        <List
          title={<h3>Friend Requests</h3>}
          component={UserCard}
          items={incomingFriendRequests}
          userRole="owner"
        />
        <List
          title={<h3>Current Friends</h3>}
          component={UserCard}
          items={currentFriends}
          userRole="owner"
          placeholder={
            <span>Use the search bar above and start adding some friends!</span>
          }
        />
      </UserListContext.Provider>
    </PageLayout>
  );
};

export default FriendsPage;
