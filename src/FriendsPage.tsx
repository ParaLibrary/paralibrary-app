import React, { useState, useEffect, useMemo } from "react";
import { User } from "./ourtypes";
import { toUser } from "./mappers";
import PageLayout from "./PageLayout";
import AutoTable, { TableColumn } from "./AutoTable";
import FriendRequestButtons, {
  FriendRequestEvent,
} from "./FriendRequestButtons";
import FriendSearchBar from "./FriendSearchBar";

const FriendsPage: React.FC = () => {
  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<User[]>([]);
  const [nearbyPeople] = useState<User[]>([]);

  function onAcceptFriendship({ successful, id }: FriendRequestEvent) {
    if (!successful) {
      return;
    }
    let friend = friends.find((friend) => friend.id === id);
    if (friend) {
      friend.status = "friends";
      setFriends([...friends]);
    }
  }

  function onRejectFriendship({ successful, id }: FriendRequestEvent) {
    if (successful) {
      setFriends(friends.filter((friend) => friend.id !== id));
    }
  }

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
          setError(error);
        }
      )
      .catch((error) => {
        setError(error);
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
          placeholder={"Huh, seems like no one's around..."}
        >
          <TableColumn col={"name"}>Name</TableColumn>
          <button>Invite!</button>
        </AutoTable>
      }
    >
      {!isLoaded ? (
        "Loading..."
      ) : error ? (
        "An error occured."
      ) : (
        <>
          <FriendSearchBar />
          <AutoTable
            data={outgoingFriendRequests}
            title={<h3>Waiting for a response</h3>}
            hideOnEmpty
          >
            <TableColumn col={"name"}>Username</TableColumn>
          </AutoTable>
          <AutoTable
            data={incomingFriendRequests}
            title={<h3>Friend Requests</h3>}
            hideOnEmpty
          >
            <TableColumn col={"name"}>Username</TableColumn>
            <FriendRequestButtons
              onAccept={onAcceptFriendship}
              onReject={onRejectFriendship}
            />
          </AutoTable>
          <AutoTable
            data={currentFriends}
            title={<h3>Current Friends</h3>}
            hideOnEmpty
          >
            <TableColumn col={"name"}>Username</TableColumn>
          </AutoTable>
        </>
      )}
    </PageLayout>
  );
};

export default FriendsPage;
