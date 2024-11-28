import "./DetailsSection.css";
import ChannelList from "../Chat/ChannelList/ChannelList.jsx";
import { useState } from "react";
// import logo from "../../assets/ChitChat-Logo.png";

function DetailsSection({ onChannelSelect }) {

  const [selectedTab, setSelectedTab] = useState("primary");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  }

  return (
    <div className="details-section">
      {/* <h3>Details</h3> */}
      {/* <img id="logo" src={logo} /> */}
      {/* <p>Where conversations spark and connections shine!</p> */}
      {/*Welcome to ChitChat, the coziest corner of the internet where conversations flow as effortlessly as your morning coffee! Whether you’re catching up with friends, sharing secrets, or planning your next big adventure, ChitChat keeps things fun, friendly, and oh-so-relaxing. Jump in and let the chitter-chatter begin! 🌟*/}
      <div className ="title-container">
        <h3>Inbox</h3>
      </div>
      <div className ="tabs">
        <button className={selectedTab === "primary" ? "tab selected" : "tab"}
          onClick={() => handleTabClick("primary")}>Primary</button>
        <button className={selectedTab === "channels" ? "tab selected" : "tab"}
          onClick={() => handleTabClick("channels")}>Channels</button>
        <button className={selectedTab === "archived" ? "tab selected" : "tab"}
          onClick={() => handleTabClick("archived")}>Archived</button>
      </div>

      {selectedTab === "channels" && (
        <div className="channel-list-container">
          <ChannelList onChannelSelect={onChannelSelect} />
        </div>
      )}
    </div>
    
  );
};

export default DetailsSection;
