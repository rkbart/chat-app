import {useState} from 'react';
import Sidebar from "../../components/SideBar/Sidebar.jsx";
import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow.jsx";
import DetailsSection from "../../components/DetailsSection/DetailsSection.jsx";
import Header from "../../components/Header/Header.jsx";
import {useData} from "../../context/DataProvider.jsx";
import {useNavigate} from "react-router-dom";
import "./Main.css";

function Main() {
  const { userHeaders } = useData();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [chatRoom, setChatRoom] = useState("Select a channel");
  const [receiver, setReceiver] = useState(null);
  const [channelName, setChannelName] = useState({ name: "", id: "" });
  const [inbox, setInbox] = useState([]);
  const [selectedTab, setSelectedTab] = useState("primary");
  const [userAvatars, setUserAvatars] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const headerTitle = userHeaders.uid.split("@")[0];
  
 
  const handleChatRoom = (channel) => {
    setChatRoom(channel);
  }

  const handleInboxSelect = (senderId) => {
    setReceiver(senderId);  // Update receiver to the clicked user's id
  };

  const handleChannelSelect = (selectedChannelName) => {
    console.log("Channel name received in Main:", selectedChannelName)
    setChannelName(selectedChannelName); // Update receiver to the clicked channel's name
  };

  const handleLogout = () => {
    navigate('/');
    localStorage.clear();
  };

  return (
    <div className="main-layout">
      <Sidebar 
        className="sidebar-pos" 
        onChannelSelect={handleChatRoom} 
        setReceiver={setReceiver}
        setInbox={setInbox}
        setUserList={setUserList}
        setUserAvatars={setUserAvatars}
        setSelectedTab={setSelectedTab}
        channelMembers={channelMembers}
        />

      <div className="main-pos">
        <Header 
          className="chat-header" 
          chatRoom={chatRoom}
          headerTitle={headerTitle}
          handleLogout={handleLogout}/>

        <div className="details-chat">
          <DetailsSection inbox={inbox} 
                          onInboxSelect={handleInboxSelect}
                          onChannelSelect={handleChannelSelect}
                          selectedTab={selectedTab} 
                          setSelectedTab={setSelectedTab}
                          userList={userList}
                          setChannelMembers={setChannelMembers}
                          
                          />
          <ChatWindow receiver={receiver} 
                      userList={userList} 
                      channelName={channelName}
                      selectedTab={selectedTab}
                      userAvatars={userAvatars}
                      channelMembers={channelMembers}
                      setSelectedTab={setSelectedTab}
                      setReceiver={setReceiver}
                       />
        </div>  
      </div> 
    </div>
  );
};

export default Main;
