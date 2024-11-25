import "./ChatWindow.css";
import selectRoom from "../../../assets/select-room.png";

function ChatWindow({chatRoom}) {
  
  return (
    <div className="chat-window">
      <header className="chat-header">
        <h2>#{chatRoom}</h2>
        <span className="status">Online</span>
      </header>
      <section className="chat-messages">
        {/* <div className="chat-bubble sender">Hello! How are you?</div>
        <div className="chat-bubble receiver">I’m good, thank you! 😊</div> */}
        <img id="select-room-img" src={selectRoom} />
        <div>Please select a channel</div>
      </section>
      <footer className="chat-input">
        <textarea 
          rows="4" 
          cols="50" 
          placeholder="Type a message..."
          />
        <button className="send-button">Send</button>
      </footer>
    </div>
  );
};

export default ChatWindow;
