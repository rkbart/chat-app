import "./ChannelList.css";
import { useState, useEffect } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import NewChannel from "../NewChannel/NewChannel.jsx";
import { useData } from "../../../context/DataProvider.jsx";
import { API_URL } from "../../../constants/Constants.jsx";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function ChannelList({onChannelSelect, addUser, setAddUser, userList, setChannelMembers, channelMembers}) {
 
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
        console.log("list of channels: ", channels)
      if(channels) {
      setChannelsList(channels || []);
      }
      
    } catch(error) {
      if(error.response?.data?.errors){
        return toast.error("Cannot get channels.");
      }
    }
  }
  useEffect(() => { 
    if(channelsList.length === 0) {
      getChannels();
      }
    },[]
  );
  
  function handleCancel() {
    setAddChannelVisible(false);
  }

  function selectChannel(channel) {
    console.log("Channel selected in ChannelList:", channel);
    setSelectedChannel(channel.id)
    getChannelDetails(channel.id)

    if (onChannelSelect) {
      onChannelSelect(channel); 
    }
  };
  const getChannelDetails = async (channelId) => {
    try {
      const response = await axios.get(`${API_URL}/channels/${channelId}`, { headers: userHeaders });
      const channelDetails = response.data.data;
        console.log("Selected Channel ID:", channelId);
        console.log("Channel Details:", channelDetails);
        console.log("members: ", channelDetails.channel_members)
      setChannelMembers(channelDetails.channel_members)
    } catch (error) {
        console.error("Error fetching channel details:", error);
      toast.error("Cannot get channel details.");
    }
  };

  const handleAddUserClick = (e) => {
    e.preventDefault();
      console.log(`array ng selectedUserIds: ${selectedUserIds}`)
      console.log("selected Channel ito:", selectedChannel)
    setIsModalOpen(true); 
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId) // unselect if already selected
        : [...prevSelected, userId] // select new user
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
      
      alert("User added successfully!");
      setSelectedUserIds([]);
      setIsModalOpen(false); 
    } catch (error) {
      console.error(error);
      return toast.error("Failed to add users.");
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
            <label>
          <input
            type="checkbox"
            checked={userList.length > 0 && selectedUserIds.length === userList.length}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setSelectedUserIds(isChecked ? userList.map((user) => user.id) : []);
            }}
          />
          Select All
        </label>
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