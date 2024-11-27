import {useState} from 'react';
import Sidebar from "../../components/SideBar/Sidebar.jsx";
import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow.jsx";
import DetailsSection from "../../components/DetailsSection/DetailsSection.jsx";
import Header from "../../components/Header/Header.jsx";
import "./Main.css";

function Main() {

  const [chatRoom, setChatRoom] = useState("Select a channel");

  const handleChatRoom = (channel) => {
    setChatRoom(channel);
  }

  return (
    <div className="main-layout">
      <Sidebar className="sidebar-pos" onChannelSelect={handleChatRoom}/>
      <div className="main-pos">
        <Header className="chat-header" chatRoom={chatRoom}/>
        <div className="details-chat">
         <DetailsSection />
         <ChatWindow />
        </div>  
      </div> 
    </div>
  );
};

export default Main;
