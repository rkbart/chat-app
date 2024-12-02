import "./ChannelList.css";
import { useState, useEffect } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import NewChannel from "../NewChannel/NewChannel.jsx";
import { useData } from "../../../context/DataProvider.jsx";
import { API_URL } from "../../../constants/Constants.jsx";
import axios from "axios";

function ChannelList({onChannelSelect, addUser, setAddUser, userList}) {
 
  const { userHeaders } = useData();
  const [channelsList, setChannelsList] = useState([]);
  const [addChannelVisible, setAddChannelVisible] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    setSelectedChannel(channel.id)
  };

  const handleAddUserClick = (e) => {
    e.preventDefault();
    console.log(`array ng selectedUserIds: ${selectedUserIds}`)
    console.log("selected Channel ito:", selectedChannel)
    setIsModalOpen(true); // Open the modal
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId) // Unselect if already selected
        : [...prevSelected, userId] // Select new user
    );
  };

  const handleSaveUsers = async () => {
    try {
      for (const userId of selectedUserIds) {
        const info = {
          id: selectedChannel,
          member_id: userId
        } 
      await axios.post(
        `${API_URL}/channel/add_member`,info,{ headers: userHeaders }
      );}

      alert("Users added successfully!");
      setSelectedUserIds([]);
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error(error);
      alert("Failed to add users.");
    }
  };

  return (
    <div className="channels">
      <ul>
        {channelsList.map((channel, index) => (
          <li
            className="channel-list-item"
            key={index}
            onClick={() => selectChannel(channel)}
          >
            <span className="list-holder">
              <span>#{channel.name}</span>
            </span>
            <AiOutlineUsergroupAdd
              className="add-user-icon"
              onClick={handleAddUserClick}
            />
          </li>
        ))}
      </ul>

      {addChannelVisible && (
        <NewChannel onCancel={handleCancel} addUser={addUser} setAddUser={setAddUser} />
      )}

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="add-user-container">
            <h3>Add Users to Channel</h3>
            <ul className="user-list">
              {userList.map((individual) => {
                const { id, email } = individual;
                const username = email.split("@")[0];
                return (
                  <li key={id} className="user-item">
                    <label>
                      <input
                        type="checkbox"
                        value={id}
                        checked={selectedUserIds.includes(id)}
                        onChange={() => handleCheckboxChange(id)}
                      />
                      {username}
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="buttons">
              <button onClick={handleSaveUsers}>Save</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default ChannelList;