import "../NewChannel/NewChannel.css";
import { useData } from "../../../context/DataProvider.jsx";
import axios from "axios";
import { useState } from "react";

function NewChannel({  onCancel }) {
  const { idHolder } = useData();
  const [channelName, setChannelName] = useState("");
  // const [userIds, setUserIds] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (channelName.trim()) {
      console.log(channelName)
      console.log(idHolder)
    }
    // try {
    //   const channelRequestBody = {
    //     "name": channelName,
    //     "user_ids": []
    //   }

    // } catch {

    // }
  }
    


  return (
    <div className="backdrop">
    <div className="new-channel-container">
      <input
        type="text"
        placeholder="Enter channel name"
        autoCorrect="false"
        maxLength={15}
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <div id="buttons">
        <button onClick={handleAdd}>Add Channel</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
    </div>  
  );
}

export default NewChannel;
