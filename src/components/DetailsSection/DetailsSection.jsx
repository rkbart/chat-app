import "./DetailsSection.css";
import ChannelList from "../Chat/ChannelList/ChannelList.jsx";
import { useState } from "react";

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

  // Get the latest message for each sender
  const getLatestMessages = (inbox) => {
    // Sort inbox by `created_at` descending (newest first)
    const sortedInbox = inbox.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Use a Map to store the latest message for each sender by their ID
    const latestMessagesMap = new Map();
    sortedInbox.forEach((message) => {
      if (!latestMessagesMap.has(message.sender.id)) {
        latestMessagesMap.set(message.sender.id, message); // Add only the first (latest) message for this sender
      }
    });

    // Return an array of unique messages (latest ones only)
    return Array.from(latestMessagesMap.values());
  };

  // Get the filtered and sorted messages
  const latestMessages = getLatestMessages(inbox);

  return (
    <div className="details-section">
      <div className="title-container">
        <h3>Inbox</h3>
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

      {selectedTab === "channels" && (
        <div className="channel-list-container">
          <ChannelList onChannelSelect={onChannelSelect} />
        </div>
      )}
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
    </div>
  );
}

export default DetailsSection;
