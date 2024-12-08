import "./DetailsSection.css";
import { MdPlaylistAdd } from "react-icons/md";
import ChannelList from "../Chat/ChannelList/ChannelList.jsx";
import { useState } from "react";
import NewChannel from "../../components/Chat/NewChannel/NewChannel.jsx"
import { useData } from "../../context/DataProvider.jsx";

function DetailsSection({ 
  selectedTab, 
  setSelectedTab, 
  onChannelSelect, 
  inbox, 
  onInboxSelect, 
  userList, 
  setChannelMembers, 
  channelMembers }) 
{

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addUser,setAddUser] = useState(false);
  const { userHeaders } = useData();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleInboxClick = (senderId) => {
    if (onInboxSelect) {
      onInboxSelect(senderId);  
    }
  };

  const handleChannelClick = (channel) => {
    console.log("Channel name passed to DetailsSection:", channel);
    if (onChannelSelect) {
      onChannelSelect(channel); 
    }
  };

  const handleAddChannelClick = () => {
    setIsModalOpen(true); 
    setAddUser(true)
    console.log(addUser)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const getLatestMessages = (inbox) => {
    if (!Array.isArray(inbox)) return [];
  
    const sortedInbox = inbox.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const latestMessagesMap = new Map();
  
    sortedInbox.forEach((message) => {
      
      if (
        message?.sender?.uid !== userHeaders.id && // exclude self-sent messages
        message?.sender?.id && 
        !latestMessagesMap.has(message.sender.id)
      ) {
        latestMessagesMap.set(message.sender.id, message);
      }
    });
  
    return Array.from(latestMessagesMap.values());
  };

  const latestMessages = getLatestMessages(inbox);

  return (
    <div className="details-section">
      <div className="title-container">
      <h3>
        {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
      </h3>
        <MdPlaylistAdd
          className={`add-channel-icon ${selectedTab === "channels" ? "visible" : "hidden"}`}
          onClick={handleAddChannelClick}
        />
      </div>
      <div className="tabs">
        <button
          className={selectedTab === "primary" ? "tab selected" : "tab"}
          onClick={() => handleTabClick("primary")}
        >
          Inbox
        </button>
        <button
          className={selectedTab === "channels" ? "tab selected" : "tab"}
          onClick={() => handleTabClick("channels")}
        >
          Channels
        </button>
        <button
          className={selectedTab === "archived" ? "tab selected" : "tab"}
          onClick={() => handleTabClick("archived")}
        >
          Archived
        </button>
      </div>
      
      {selectedTab === "primary" && (
        <div className="primary-container">
          <ul>
            {latestMessages.length > 0 ? (
              latestMessages
                .filter((message) => message.sender.uid !== userHeaders.uid) // Filter out messages from self
                .map((message, index) => (
                <li key={index} 
                    className="message-item"
                    onClick={() => handleInboxClick(message.sender.id)}>
                  <p><strong> {message.sender.uid.split("@")[0]}</strong></p>
                  <p>Message: {message.body}</p>
                  <p>Sent At: {new Date(message.created_at).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p>No messages found.</p>
            )}
          </ul>
        </div>
      )}
      {selectedTab === "channels" && (
        <div className="channel-list-container">
          <ChannelList onChannelSelect={handleChannelClick}
                       userList={userList}
                       addUser={addUser}
                       setAddUser={setAddUser}
                       setChannelMembers={setChannelMembers}
                       channelMembers={channelMembers}
                        /> 
        </div>
      )}
      {selectedTab === "archived" && (
        <div className="archive-container">
          <h4>No Archives found.</h4>
        </div>
      )}
      
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <NewChannel onCancel={handleCloseModal}
                        userList={userList}
                        addUser={addUser}
                        setAddUser={setAddUser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsSection;
