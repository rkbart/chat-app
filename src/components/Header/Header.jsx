import "./Header.css";
import { TbLogout2 } from "react-icons/tb";
import {useData} from "../../context/DataProvider.jsx";
import {useNavigate} from "react-router-dom";

function Header() {
  const { userHeaders } = useData();
  const headerAvatar = "https://robohash.org/${userHeader.uid}.png?set=set4"
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return(
        <header className="chat-header">
        <span>
          <img src={headerAvatar}/>
          <h2>{`Hi, ${userHeaders.uid.split("@")[0]}`}</h2>
        </span>
        
        <div className="logout-container"
            onClick={handleLogout}>
        <TbLogout2 className="logout" />
        <h4>Log out</h4>
        </div>
      
      </header>
    )
}

export default Header;