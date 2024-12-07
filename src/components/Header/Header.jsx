import "./Header.css";
import { TbLogout2 } from "react-icons/tb";

function Header({headerTitle,handleLogout}) {
  const headerAvatar = "https://robohash.org/${userHeader.uid}.png?set=set4"

return(
  <div className="chat-header">
    <span>
      <img src={headerAvatar}/>
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