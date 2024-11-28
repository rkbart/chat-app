import "./ChannelList.css";
import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import NewChannel from "../NewChannel/NewChannel.jsx";

function ChannelList({onChannelSelect}) {

  const [channelsList, setChannelsList] = useState(["General", "Work", "Random"]);
  const [addChannelVisible, setAddChannelVisible] = useState(false);
  
  function handleAddChannel() {

    if (channelsList.length < 5) {
      setAddChannelVisible(true);
    } else {
      alert("You can only create 5 channels.")
    }
  }
  
  function handleCancel() {
    setAddChannelVisible(false);
  }

  function selectChannel(channel) {
    onChannelSelect(channel); // send to sidebar
  };

  function deleteChannel(index) {
    const updatedChannelsList = channelsList.filter((_,i) => i !== index);
    
    if (channelsList.length === 1) {
      onChannelSelect(updatedChannelsList[0]);
      alert("You cannot delete all channels.")
    } else {
      setChannelsList(updatedChannelsList);
    }
  }

  // function deleteChannel(index) {
  //   if (channelsList.length <= 1) {
  //     alert("You cannot delete all channels.")
  //   } else {
  //     const updatedChannelsList = channelsList.filter((_,i) => i !== index);
  //     setChannelsList(updatedChannelsList);
  //     if (updatedChannelsList.length === 1) {
  //       onChannelSelect(updatedChannelsList[0]);
  //     }
  //   }
  // }

  return (
    <div className="channels">
      {/* <span id="icon">
        <h3>Channels </h3>
        <MdPlaylistAdd 
          className="add-channel-icon"
          onClick={handleAddChannel} />
      </span> */}

      <ul>
        {channelsList.map((channel,index) => 
          <li key={index}
              onClick={() => selectChannel(channel)}>
              <span className="list-holder">
                <span>#{channel}</span>
                <RiDeleteBin6Line 
                  className="remove-channel-icon"
                  onClick={() => deleteChannel(index)} 
                />
              </span>
          </li>
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