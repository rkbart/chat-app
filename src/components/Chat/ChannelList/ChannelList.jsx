import "./ChannelList.css";
import { useState } from "react";
import { MdPostAdd } from "react-icons/md";
import NewChannel from "../NewChannel/NewChannel.jsx";

function ChannelList({onChannelSelect}) {

  const [channelsList, setChannelsList] = useState(["General", "Work", "Random"]);
  const [addChannelVisible, setAddChannelVisible] = useState(false);
  
  function handleAddChannel() {
    setAddChannelVisible(true);
  }
  
  function handleCancel() {
    setAddChannelVisible(false);
  }

  function selectChannel(channel) {
    onChannelSelect(channel); // send to sidebar
  };

  return (
    <div className="channels">
      <span id="icon">
        <h3>Channels </h3>
        <MdPostAdd 
          className="add-channel-icon"
          onClick={handleAddChannel} />
      </span>

      <ul>
        {channelsList.map((channel,index) => 
          <li key={index}
              onClick={() => selectChannel(channel)}>
            #{channel}</li>
        )}
      </ul>
      
      {addChannelVisible && (
        <NewChannel 
          onAdd={(newChannel) => {
            setChannelsList([...channelsList, newChannel]);
            setAddChannelVisible(false);
          }}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default ChannelList;