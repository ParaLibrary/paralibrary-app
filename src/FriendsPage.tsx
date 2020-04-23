import React, { useState, useEffect, useMemo } from "react";
import { Friend } from "./ourtypes";
import PageLayout from "./PageLayout";
import AutoTable, { TableHeader } from "./Table";
import { Button } from "react-bootstrap";

const FriendsPage: React.FC = () => {
  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [nearbyPeople] = useState<Friend[]>([]);

  interface ButtonGroupProps {
    id: number
  }
  
  const RequestResponseButtonGroup: React.FC<ButtonGroupProps> = ({ id }) => {
    return (
      <div>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick = {() => { AcceptFriendship(id) }}
        >Accept</Button>{' '}
        <Button
          type="button"
          variant="outline-danger"
          size="sm"
          onClick = {() => { RejectFriendship(id) }}
        >Reject</Button>
      </div>
    );
  }

  function AcceptFriendship(id: number) {
    setIsLoaded(false);
    const options = {
      method: 'POST'
    }
    return fetch(`http://paralibrary.digital/api/friends/${id}/accept`, options)
    .then(response => response.status === 200)
    .then(success => {
      if(success) {
        let friend = friends.find(friend => friend.id === id);
        if(friend) {
          friend.status = "friends";
          /**
           * HELP. The following line is awful, but I don't know enough to force the state to update.
           * The data arrays are only updated when setFriends() is called, so... 
           */
          setFriends([...friends]);
        }
      }
    })
    .finally(() => {
      setIsLoaded(true);
    })
  }

  function RejectFriendship(id: number) {
    setIsLoaded(false);
    const options = {
      method: 'POST'
    }
    return fetch(`http://paralibrary.digital/api/friends/${id}/reject`, options)
    .then(response => response.status === 200)
    .then(success => {
      if(success) {
        setFriends(friends.filter(friend => friend.id !== id));
      }
    })
    .finally(() => {
      setIsLoaded(true);
    })
  }

  useEffect(() => {
    fetch("http://paralibrary.digital/api/friends")
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
      {!isLoaded ? ("Loading...")
      : error ? ("An error occured.")
      : (
        <>
          <AutoTable
            data={friendRequests}
            title={<h3>Friend Requests</h3>}
            hideOnEmpty
          >
            <TableHeader col={"display_name"}>Username</TableHeader>
            <RequestResponseButtonGroup id={0}></RequestResponseButtonGroup>
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
