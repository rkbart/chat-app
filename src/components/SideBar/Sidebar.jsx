import "./Sidebar.css";
import ChannelList from "../Chat/ChannelList/ChannelList.jsx";
import DirectMessages from "../Chat/DirectMessages/DirectMessages.jsx";

function Sidebar({onChannelSelect}) {

  return (
    <aside className="sidebar">
      <div className="search-bar">
        <input type="text" placeholder="Search channels or users..." />
      </div>
      <ChannelList onChannelSelect={onChannelSelect}/>
      <DirectMessages />
      
    </aside>
  );
};

export default Sidebar;
