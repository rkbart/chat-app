import "./ChatWindow.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider.jsx";
import { API_URL } from "../../../constants/Constants.jsx";
import { BsSend } from "react-icons/bs";

function ChatWindow({ receiver, userList }) {
  const { userHeaders } = useData();
  const [message, setMessage] = useState("");
  const [mgaMessages, setMgaMessages] = useState([]);
  
  // Find the user corresponding to the receiver ID
  const receiverUser = userList.find(user => user.id === receiver);
  const receiverEmail = receiverUser ? receiverUser.uid : "";

  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiver) return;
      
      try {
        const response = await axios.get(
          `${API_URL}/messages?receiver_id=${receiver}&receiver_class=User`,
          { headers: userHeaders }
        );

        if (response.data.data) {
          // Deduplicate messages based on unique IDs
          const uniqueMessages = response.data.data
            .filter((msg) => msg && msg.id && msg.body) // Ensure valid structure
            .filter(
              (message, index, self) =>
                index === self.findIndex((m) => m.id === message.id) // Deduplicate
            );
          setMgaMessages(uniqueMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (receiver) {
      fetchMessages();
    }
  }, [receiver, userHeaders]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty or whitespace-only messages

    try {
      const messageInfo = {
        receiver_id: Number(receiver),
        receiver_class: "User",
        body: message.trim(),
      };

      const response = await axios.post(`${API_URL}/messages`, messageInfo, {
        headers: userHeaders,
      });

      const { data } = response; // Destructure response (get data object)
      if (data.data) {
        const newMessage = data.data;

        if (newMessage && newMessage.id && newMessage.body) {
          // Add new valid message and deduplicate
          setMgaMessages((prevMessages) => {
            const allMessages = [...prevMessages, newMessage];
            return allMessages.filter(
              (msg, index, self) =>
                index === self.findIndex((m) => m.id === msg.id)
            );
          });
        }
        setMessage(""); // Clear input field
      }

      if (data.errors) {
        console.log("Errors:", data.errors); // Handle potential errors
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-window">
      <div className="name-display">
      <span>{receiver ? receiverEmail : "Select a user or channel"}</span>
      </div>

      <div className="chat-messages">
        {mgaMessages.length > 0 ? (
          mgaMessages.map((msg) => (
            msg ? ( // Ensure valid message structure before rendering
              <div
                key={msg.id}
                className={`chat-bubble ${
                  msg.sender?.id === receiver ? "receiver" : "sender"
                }`}
              >
                {msg.body}
              </div>
            ) : null
          ))
        ) : (
          <div>No messages</div>
        )}
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          autoComplete="off"
          spellCheck="false"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit" className="send-button">
          <BsSend />
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
