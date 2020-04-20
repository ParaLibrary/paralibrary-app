import React, { useState, useEffect, useMemo } from "react";
import { Friend, FriendStatus } from "./ourtypes";
import PageLayout from "./PageLayout";
import AutoTable, { TableHeader } from "./Table";

const FriendsPage: React.FC = () => {
  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [nearbyPeople] = useState<Friend[]>([]);

  useEffect(() => {
    fetch("http://paralibrary.digital/api/friends")
      .then((res) => {
        setIsLoaded(true);
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
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  const friendRequests: Friend[] = useMemo(
    () =>
      friends.filter(
        (friend: Friend) => friend.status === FriendStatus.requested
      ),
    [friends]
  );

  const currentFriends: Friend[] = useMemo(
    () =>
      friends.filter(
        (friend: Friend) => friend.status === FriendStatus.accepted
      ),
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
      {isLoaded ? (
        "Loading..."
      ) : error ? (
        "An error occured."
      ) : (
        <>
          <AutoTable
            data={friendRequests}
            title={<h3>Friend Requests</h3>}
            hideOnEmpty
          >
            <TableHeader col={"display_name"}>Username</TableHeader>
            <button>Accept</button>
            <button>Reject</button>
          </AutoTable>
          <AutoTable
            data={currentFriends}
            title={<h3>Current Friends</h3>}
            hideOnEmpty
          >
            <TableHeader col={"display_name"}>Username</TableHeader>
          </AutoTable>
        </>
      )}
    </PageLayout>
  );
};

export default FriendsPage;
