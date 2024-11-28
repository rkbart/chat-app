import "./Sidebar.css";
import ChannelList from "../Chat/ChannelList/ChannelList.jsx";
import DirectMessages from "../Chat/DirectMessages/DirectMessages.jsx";
import { PiChatsThin } from "react-icons/pi"; 
import { IoCallSharp } from "react-icons/io5"; 
import { RiContactsBook3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { TbSearch } from "react-icons/tb";

function Sidebar({onChannelSelect}) {

  return (
    <div className="sidebar">
      {/* <div className="search-bar">
        <input type="text" placeholder="Search channels or users..." />
      </div> */}
      <ChannelList onChannelSelect={onChannelSelect}/>
      <DirectMessages />
      
    </div>
  );
};

export default Sidebar;
