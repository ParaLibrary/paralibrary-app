import React, { useState, useEffect, useMemo } from "react";
import { Friend, FriendStatus } from "./ourtypes";
import PageLayout from "./PageLayout";

const FriendsPage: React.FC = () => {
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    fetch("https://paralibrary.digital/friends")
      .then((res) => res.json())
      .then(
        (result) => {
          setFriends(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    console.log("Attempt fetch all friends");
  }, []);

  const existingFriends: Friend[] = useMemo(
    () =>
      friends.filter(
        (friend: Friend) => friend.status === FriendStatus.accepted
      ),
    [friends]
  );

  return (
    <PageLayout header={<div>Friends page!</div>}>{existingFriends}</PageLayout>
  );
};

export default FriendsPage;
