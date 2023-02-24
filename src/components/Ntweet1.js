import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Ntweet = ({ ntweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNtweet, setNewNtweet] = useState(ntweetObj.text);
  const deleteDb = async () => {
    const ok = window.confirm("db를 삭제하시겠습니까?");
    if (ok) {
      //삭제
      await dbService.doc(`ntweets/${ntweetObj.id}`).delete();
      await storageService.refFromURL(ntweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (e) => {
    e.preventDefault();
    dbService.doc(`ntweets/${ntweetObj.id}`).update({
      text: newNtweet,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNtweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your ntweet"
              onChange={onChange}
              value={newNtweet}
              required
            />
            <input type="submit" value="Edit" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{ntweetObj.text}</h4>
          {ntweetObj.attachmentUrl && (
            <img src={ntweetObj.attachmentUrl} width="100px" />
          )}
          {isOwner && (
            <>
              <button onClick={deleteDb}>Delete Ntweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Ntweet;
