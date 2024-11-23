import "../NewChannel/NewChannel.css";
import { useState } from "react";

function NewChannel({ onAdd, onCancel }) {
  const [channelName, setChannelName] = useState("");

  function handleAdd() {
    if (channelName.trim()) {
      onAdd(channelName); // Pass the new channel name to parent
    }
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
