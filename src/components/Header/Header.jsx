import "./Header.css";
import { TbLogout2 } from "react-icons/tb";

function Header({headerTitle,handleLogout}) {
  const headerAvatar = "https://robohash.org/${userHeader.uid}.png?set=set4"
  

return(
        <header className="chat-header">
        <span>
          <img src={headerAvatar}/>
          
          <h2 data-testid="title">{`Hi, ${headerTitle}`}</h2>
        </span>
        
        {/* <a href= "/" > */}
        <div className="logout-container"
            onClick={handleLogout}>
        <TbLogout2 className="logout" />
        <h4 data-testid="logout">Log out</h4>
        </div>
        {/* </a> */}
      
      </header>
    )
}

export default Header;