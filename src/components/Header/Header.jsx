import "./Header.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Header({chatRoom}) {

  const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['access-token'];
        delete axios.defaults.headers.common['client'];
        delete axios.defaults.headers.common['uid'];
        navigate('/login');
    };

    return(
        <header className="chat-header">
        <h2>#{chatRoom}</h2>
        <div className="right">
          <span className="status"><span className="online-status-circle"></span>Online</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
    )
}

export default Header;