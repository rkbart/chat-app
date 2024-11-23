import {useState} from 'react';
import Sidebar from "../SideBar/Sidebar.jsx";
import ChatWindow from "../Chat/ChatWindow/ChatWindow.jsx";
import DetailsSection from "../DetailsSection/DetailsSection.jsx";
import "./Main.css";

function Main() {

  const [chatRoom, setChatRoom] = useState("Select a channel");

  const handleChatRoom = (channel) => {
    setChatRoom(channel);
  }

  return (
    <div className="main-layout">
      <Sidebar onChannelSelect={handleChatRoom}/>
      <ChatWindow chatRoom={chatRoom}/>
      <DetailsSection />
    </div>
  );
};

export default Main;
