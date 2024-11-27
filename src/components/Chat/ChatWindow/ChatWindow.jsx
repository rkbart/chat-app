import "./ChatWindow.css";
import selectRoom from "../../../assets/select-room.png";

function ChatWindow() {
  
  return (
    <div className="chat-window">
      
        <div className="chat-messages">
          {/* <div className="chat-bubble sender">Hello! How are you?</div>
          <div className="chat-bubble receiver">I’m good, thank you! 😊</div> */}
          <img id="select-room-img" src={selectRoom} />
          <div>Please select a channel</div>
          <div className="chat-input">
            <textarea 
              rows="4" 
              cols="50" 
              placeholder="Type a message..."
            />
          <button className="send-button">Send</button>
          </div>
        </div>
      
    </div>
  );
};

export default ChatWindow;
