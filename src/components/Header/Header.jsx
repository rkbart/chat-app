import "./Header.css";
import {useData} from "../../context/DataProvider.jsx";

function Header() {
  const { userHeaders } = useData();
  const headerAvatar = "https://robohash.org/${userHeader.uid}.png?set=set4"
  return(
        <header className="chat-header">
        {/* <h2>#{chatRoom}</h2> */}
        <span>
          <img src={headerAvatar}/>
        </span>
        <h2>{`Hi, ${userHeaders.uid.split("@")[0]}`}</h2>
        
      </header>
    )
}

export default Header;