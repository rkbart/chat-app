import "./Header.css";
import {useData} from "../../context/DataProvider.jsx";

function Header() {
  const { userHeaders } = useData();

  return(
        <header className="chat-header">
        {/* <h2>#{chatRoom}</h2> */}
        <h2>{`Hi, ${userHeaders.uid.split("@")[0]}`}</h2>
        <div className="right">
          <span className="status"><span className="online-status-circle"></span>Online</span>
          
        </div>
      </header>
    )
}

export default Header;