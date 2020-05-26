import React, { useState, useEffect, useMemo } from "react";
import { User } from "./ourtypes";
import { toUser } from "./mappers";
import PageLayout from "./PageLayout";
import AutoTable, { TableColumn } from "./AutoTable";
import AcceptRejectButtons from "./FriendshipAcceptRejectGroup";
import { FriendshipChangeEvent } from "./FriendshipAcceptButton";
import FriendSearchBar from "./FriendSearchBar";
import UserDisplay from "./UserDisplay";

const FriendsPage: React.FC = () => {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<User[]>([]);
  const [nearbyPeople] = useState<User[]>([]);

  function onAcceptFriendship({ successful, id }: FriendshipChangeEvent) {
    if (!successful) {
      return;
    }
    let friend = friends.find((friend) => friend.id === id);
    if (friend) {
      friend.status = "friends";
      setFriends([...friends]);
    }
  }

  function onRejectFriendship({ successful, id }: FriendshipChangeEvent) {
    if (successful) {
      setFriends(friends.filter((friend) => friend.id !== id));
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/friends", { credentials: "include" })
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
        <AutoTable
          data={nearbyPeople}
          title={<h3>Nearby People</h3>}
          noHeaders
          placeholder={"Huh, seems like no one's around..."}
        >
          <TableColumn col={"name"}>Name</TableColumn>
          <button>Invite!</button>
        </AutoTable>
      }
      error={error}
      loaded={isLoaded}
    >
      <FriendSearchBar />
      <AutoTable
        data={outgoingFriendRequests}
        title={<h3>Waiting for a response</h3>}
        noHeaders
        hideOnEmpty
      >
        <TableColumn component={UserDisplay}>Username</TableColumn>
      </AutoTable>
      <AutoTable
        data={incomingFriendRequests}
        title={<h3>Friend Requests</h3>}
        noHeaders
        hideOnEmpty
      >
        <TableColumn component={UserDisplay}>Username</TableColumn>
        <AcceptRejectButtons
          onAccept={onAcceptFriendship}
          onReject={onRejectFriendship}
        />
      </AutoTable>
      <AutoTable
        data={currentFriends}
        title={<h3>Current Friends</h3>}
        noHeaders
        placeholder={
          <>
            <span>Use the search bar above and start adding some friends!</span>
          </>
        }
      >
        <TableColumn component={UserDisplay}>Username</TableColumn>
      </AutoTable>
    </PageLayout>
  );
};

export default FriendsPage;
