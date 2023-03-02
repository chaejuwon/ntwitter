import { dbService } from "fbase";
import React, { useEffect, useState, useRef } from "react";
import Ntweet1 from "components/Ntweet1";
import NtweetFactory from "components/NtweetFactory";

const Home = ({ userObj }) => {
  const [Ntweets, setNtweets] = useState([]);

  useEffect(() => {
    dbService.collection("ntweets").onSnapshot((snapshot) => {
      const ntweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNtweets(ntweetArray);
    });
  }, []);

  return (
    <div className="container">
      <NtweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {Ntweets.map((Ntweet) => (
          <Ntweet1
            key={Ntweet}
            ntweetObj={Ntweet}
            isOwner={Ntweet.createdId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
