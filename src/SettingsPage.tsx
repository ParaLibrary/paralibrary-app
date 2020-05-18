import React, { useState, useContext, useEffect, useCallback } from "react";
import { useFormik } from "formik";

import PageLayout from "./PageLayout";
import { AuthContext } from "./AuthContextProvider";
import { User } from "./ourtypes";
import { toUser } from "./mappers";

const SettingsPage: React.FC = () => {
  const { credential } = useContext(AuthContext);
  const [user, setUser] = useState<User>({ id: "", name: "", status: null });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    fetch(`http://paralibrary.digital/api/users/${credential.userId}`, {
      credentials: "include",
    })
      .then((res: Response) => res.json())
      .then(
        (body: any) => {
          console.log(body);
          setUser(toUser(body));
        },
        (error: any) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  return <PageLayout header={<h1>My Settings</h1>}></PageLayout>;
};

export default SettingsPage;
