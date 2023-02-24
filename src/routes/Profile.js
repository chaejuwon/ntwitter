import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNtweets = async () => {
    const ntweets = await dbService
      .collection("ntweets")
      .where("createdId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
  };
  useEffect(() => {
    getMyNtweets();
  }, []);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName:newDisplayName
      });
      refreshUser();
    }    
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={newDisplayName}
          type="text"
          placeholder="Display name"
        />
        <input type="submit" value="update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
