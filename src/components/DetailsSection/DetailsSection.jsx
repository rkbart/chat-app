import "./DetailsSection.css";
import { MdPlaylistAdd } from "react-icons/md";
import ChannelList from "../Chat/ChannelList/ChannelList.jsx";
import { useState, useEffect } from "react";

function DetailsSection({ onChannelSelect, inbox, onInboxSelect  }) {
  const [selectedTab, setSelectedTab] = useState("primary");
  
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleInboxClick = (senderId) => {
    if (onInboxSelect) {
      onInboxSelect(senderId);  // Pass selected senderId to parent
    }
  };

  const handleChannelClick = (channelName) => {
    if (onChannelSelect) {
      onChannelSelect(channelName); // Pass the selected channel's name
    }
  };

  const getLatestMessages = (inbox) => {
    if (!Array.isArray(inbox)) return [];

    const sortedInbox = inbox.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const latestMessagesMap = new Map();
    sortedInbox.forEach((message) => {
      if (message?.sender?.uid !== "ryan.kristopher.bartolome@gmail.com" && message?.sender?.id && !latestMessagesMap.has(message.sender.id)) {
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
        />
      </div>
      <div className="tabs">
        <button
          className={selectedTab === "primary" ? "tab selected" : "tab"}
          onClick={() => handleTabClick("primary")}
        >
          Primary
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
              latestMessages.map((message, index) => (
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
          <ChannelList onChannelSelect={(channelName) => handleChannelClick(channelName)} /> 
        </div>
      )}
      {selectedTab === "archived" && (
        <div className="archive-container">
          <h4>No Archives found.</h4>
        </div>
      )}
    </div>
  );
}

export default DetailsSection;
