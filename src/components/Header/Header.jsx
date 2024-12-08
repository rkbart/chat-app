import "./Header.css";
import { TbLogout2 } from "react-icons/tb";

function Header({headerTitle,handleLogout,headerAvatar}) {
  

return(
  <div className="chat-header">
    <span>
      <img src={headerAvatar} alt="avatar"/>
      <h2 data-testid="title">{`Hi, ${headerTitle}`}</h2>
    </span>
        
    <div className="logout-container"
         onClick={handleLogout}>
      <TbLogout2 className="logout" />
      <h4 data-testid="logout">Log out</h4>
    </div>
  </div>
  )
}

export default Header;