import React, { useState, useEffect, useMemo } from "react";
import { Friend } from "./ourtypes";
import PageLayout from "./PageLayout";
import AutoTable, { TableHeader } from "./AutoTable";
import FriendRequestButtons from "./FriendRequestButtons";
import FriendSearchBar from "./FriendSearchBar";

const FriendsPage: React.FC = () => {
  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [nearbyPeople] = useState<Friend[]>([]);

  function AcceptFriendship(id: string) {
    return fetch(`http://paralibrary.digital/api/friends/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "accepted",
      }),
    })
      .then((response) => response.status === 200)
      .then((success) => {
        if (success) {
          let friend = friends.find((friend) => friend.id === id);
          if (friend) {
            friend.status = "friends";
            setFriends([...friends]);
          }
        }
      });
  }

  function RejectFriendship(id: string) {
    return fetch(`http://paralibrary.digital/api/friends/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "rejected",
      }),
    })
      .then((response) => response.status === 200)
      .then((success) => {
        if (success) {
          setFriends(friends.filter((friend) => friend.id !== id));
        }
      });
  }
  useEffect(() => {
    fetch("http://paralibrary.digital/api/friends", { credentials: "include" })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setFriends(result);
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

  const friendRequests: Friend[] = useMemo(
    () => friends.filter((friend: Friend) => friend.status === "requested"),
    [friends]
  );

  const currentFriends: Friend[] = useMemo(
    () => friends.filter((friend: Friend) => friend.status === "friends"),
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
          <TableHeader col={"name"}>Name</TableHeader>
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
          <div style={{ zIndex: 0, position: "sticky" }}>
            <AutoTable
              data={friendRequests}
              title={<h3>Friend Requests</h3>}
              hideOnEmpty
            >
              <TableHeader col={"display_name"}>Username</TableHeader>
              <FriendRequestButtons
                id={""}
                onAccept={AcceptFriendship}
                onReject={RejectFriendship}
              />
            </AutoTable>
            <AutoTable
              data={currentFriends}
              title={<h3>Current Friends</h3>}
              hideOnEmpty
            >
              <TableHeader col={"display_name"}>Username</TableHeader>
            </AutoTable>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default FriendsPage;
