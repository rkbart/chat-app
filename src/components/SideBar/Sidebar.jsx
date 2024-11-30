import "./Sidebar.css";
import ChannelList from "../Chat/ChannelList/ChannelList.jsx";
import DirectMessages from "../Chat/DirectMessages/DirectMessages.jsx";
import { PiChatsThin } from "react-icons/pi"; 
import { IoCallSharp } from "react-icons/io5"; 
import { RiContactsBook3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Sidebar({ setReceiver, setInbox, setUserList}) {

  const navigate = useNavigate();

  const handleLogout = () => {
      navigate('/');
  };

  return (
    <div className="sidebar">

      <div className="contacts-container">
        <RiContactsBook3Line className="contacts" /> 
        <h3>Contacts</h3>
      </div>
      <DirectMessages 
        className="direct-messages"
        setReceiver={setReceiver} 
        setInbox={setInbox}
        setUserList={setUserList}
        />
     <div className="logout-container"
            onClick={handleLogout}>
        <TbLogout2 className="logout" />
        <h4>Log out</h4>
      </div>
    </div>
  );
};

export default Sidebar;
