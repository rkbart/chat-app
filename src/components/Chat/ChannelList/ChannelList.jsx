import "./ChannelList.css";
import { useState, useEffect } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import NewChannel from "../NewChannel/NewChannel.jsx";
import { useData } from "../../../context/DataProvider.jsx";
import { API_URL } from "../../../constants/Constants.jsx";
import axios from "axios";

function ChannelList({onChannelSelect}) {
 
  const { userHeaders } = useData();
  const [channelsList, setChannelsList] = useState([]);
  const [addChannelVisible, setAddChannelVisible] = useState(false);

  const getChannels = async () => {

    try {
      const response = await axios.get(`${API_URL}/channels`,  { headers : userHeaders });
      const channels = response.data.data;
      console.log(channels)
      if(channels) {
      setChannelsList(channels || []);
    }
        
    
    } catch(error) {
      if(error.response?.data?.errors){
        alert("Cannot get channels.");
      }
    }
  }
  useEffect(() => { 
    if(channelsList.length === 0) {
      getChannels();
      }
    },[]
  );
  
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
    console.log("Channel selected in ChannelList:", channel);
    if (onChannelSelect) {
      onChannelSelect(channel); 
    }
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

return (
    <div className="channels">
      <ul>
        {channelsList.map((channel,index) => 
          <li className="channel-list-item" 
              key={index}
              onClick={() => selectChannel(channel)}
              >
              <span className="list-holder" >
                <span>#{channel.name}</span>
                <RiDeleteBin6Line 
                  className="remove-channel-icon"
                  onClick={() => deleteChannel(index)} 
                />
              </span>
          </li>
        )}
      </ul>
      
      {addChannelVisible && (
        <NewChannel onCancel={handleCancel} />
      )}
    </div>
  )
}

export default ChannelList;