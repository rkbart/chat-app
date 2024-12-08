import "./Sidebar.css";
import DirectMessages from "../Chat/DirectMessages/DirectMessages.jsx";
import { RiContactsBook3Line } from "react-icons/ri";

function Sidebar({ setReceiver, setInbox, setUserList, setUserAvatars, setSelectedTab, searchTerm, setSearchTerm }) {

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
        setSelectedTab={setSelectedTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        />
     
    </div>
  );
};

export default Sidebar;
