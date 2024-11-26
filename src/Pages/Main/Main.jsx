import {useState} from 'react';
import Sidebar from "../../components/SideBar/Sidebar.jsx";
import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow.jsx";
import DetailsSection from "../../components/DetailsSection/DetailsSection.jsx";
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
