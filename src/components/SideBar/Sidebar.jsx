import "./Sidebar.css";
import ChannelList from "../Chat/ChannelList/ChannelList.jsx";
import DirectMessages from "../Chat/DirectMessages/DirectMessages.jsx";

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
