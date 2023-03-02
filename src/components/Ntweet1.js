import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your ntweet"
              onChange={onChange}
              value={newNtweet}
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Edit" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{ntweetObj.text}</h4>
          {ntweetObj.attachmentUrl && <img src={ntweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={deleteDb}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Ntweet;
