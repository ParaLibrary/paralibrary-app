import React, { useState, useEffect } from "react";

interface Friend {
  username: string;
  status: FriendStatus;
}

enum FriendStatus {
  accepted,
  requested,
}

const FriendsPage: React.FC = () => {
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<Friend[] | undefined>();

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
  }, []);

  return <div>Friends page!</div>;
};

export default FriendsPage;
