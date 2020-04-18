import React, { useState, useEffect, useMemo } from "react";
import { Friend, FriendStatus } from "./ourtypes";
import PageLayout from "./PageLayout";
import AutoTable, { TableHeader } from "./Table";

const FriendsPage: React.FC = () => {
  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 1,
      name: "Tait",
      display_name: "Lemniscate",
      status: FriendStatus.accepted,
    },
  ]);

  useEffect(() => {
    fetch("https://paralibrary.digital.api/friends")
      .then((res) => res.json())
      .then(
        (result) => {
          //setFriends(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((error) => {
        setIsLoaded(true);
        console.log(error);
      });
    console.log("Attempt fetch all friends");
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
    <PageLayout header={<div>Friends page!</div>}>
      <AutoTable data={friendRequests} hideOnEmpty>
        <TableHeader col={"id"}>ID</TableHeader>
        <TableHeader col={"name"}>Name</TableHeader>
        <TableHeader col={"display_name"}>Username</TableHeader>
        <TableHeader col={"status"}>Status</TableHeader>
      </AutoTable>
      <AutoTable data={currentFriends} hideOnEmpty>
        <TableHeader col={"id"}>ID</TableHeader>
        <TableHeader col={"name"}>Name</TableHeader>
        <TableHeader col={"display_name"}>Username</TableHeader>
        <TableHeader col={"status"}>Status</TableHeader>
        <button>Test</button>
      </AutoTable>
    </PageLayout>
  );
};

export default FriendsPage;
