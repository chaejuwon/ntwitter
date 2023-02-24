import React, { useState, useRef } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const NtweetFactory = ({ userObj }) => {
  const [Ntweet, setNtweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const ntweetObj = {
      text: Ntweet,
      createdAt: Date.now(),
      createdId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("ntweets").add(ntweetObj);
    setNtweet("");
    setAttachment("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNtweet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => {
    setAttachment(null);
    fileInput.current.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={Ntweet}
        type="text"
        placeholder="What`s on your mind?"
        maxLength={120}
      />
      <input type="submit" value="Ntweet" />
      <input
        onChange={onFileChange}
        type="file"
        accept="image/*"
        ref={fileInput}
      />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachmentClick}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NtweetFactory;
