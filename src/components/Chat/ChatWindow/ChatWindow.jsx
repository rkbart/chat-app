import "./ChatWindow.css";

function ChatWindow({chatRoom}) {
  
  return (
    <main className="chat-window">
      <header className="chat-header">
        <h2>#{chatRoom}</h2>
        <span className="status">Online</span>
      </header>
      <section className="chat-messages">
        <div className="chat-bubble sender">Hello! How are you?</div>
        <div className="chat-bubble receiver">I’m good, thank you! 😊</div>
      </section>
      <footer className="chat-input">
        <textarea 
          rows="4" 
          cols="50" 
          placeholder="Type a message..."
          />
        <button className="send-button">Send</button>
      </footer>
    </main>
  );
};

export default ChatWindow;
