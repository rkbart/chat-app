import "./Sidebar.css";
import DirectMessages from "../Chat/DirectMessages/DirectMessages.jsx";
import { PiChatsThin } from "react-icons/pi"; 
import { IoCallSharp } from "react-icons/io5"; 
import { RiContactsBook3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";

function Sidebar({ setReceiver, setInbox, setUserList,setUserAvatars}) {

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
        setUserAvatars={setUserAvatars}
        />
     
    </div>
  );
};

export default Sidebar;
