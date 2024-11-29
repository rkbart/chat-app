import "./Header.css";

function Header({chatRoom}) {
  
  return(
        <header className="chat-header">
        {/* <h2>#{chatRoom}</h2> */}
        <h2>ChitChat</h2>
        <div className="right">
          <span className="status"><span className="online-status-circle"></span>Online</span>
          
        </div>
      </header>
    )
}

export default Header;