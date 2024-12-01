import "./ChatWindow.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider.jsx";
import { API_URL } from "../../../constants/Constants.jsx";
import { BsSend } from "react-icons/bs";

function ChatWindow({ receiver, userList, channelName, selectedTab }) {
  console.log("Channel name in ChatWindow:", channelName);
  console.log("Props in ChatWindow - Channel Name:", channelName);
  console.log("Props in ChatWindow - Receiver:", receiver);

  const { userHeaders } = useData();
  const [message, setMessage] = useState("");
  const [mgaMessages, setMgaMessages] = useState([]);
  const [mgaChannelMessages, setMgaChannelMessages] = useState([]);
  
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

  useEffect(()=>{
    if (!channelName) return;

    const channelDetails = async () => {
    
      try {
        const response = await axios.get(`${API_URL}/messages?receiver_id=${channelName.id}&receiver_class=Channel`,{ headers: userHeaders });
        
        const lamanNgChannel = response.data.data || [];
        setMgaChannelMessages(lamanNgChannel);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (channelName) {
      channelDetails();
    }
  },[channelName, userHeaders])


  return (
    <div className="chat-window">
      
      {selectedTab === "primary" && (
        <div className="primary-chat-container">
          <div className="name-display">
          {receiverUser ? <span>{receiverEmail}</span> : <span>Select a user or channel</span>}
        </div>
        
        <div className="chat-messages">
          {mgaMessages.length > 0 ? (
            mgaMessages.map((msg) =>
              msg ? (
                <div
                  key={msg.id}
                  className={`chat-bubble ${
                    msg.sender?.id === receiver ? "receiver" : "sender"
                  }`}
                >
                  {msg.body}
                </div>
              ) : null
            )
          ) : (
            <div>No messages</div>
          )}
        </div>
        </div>
      )}

      {selectedTab === "channels" && (
        <div className="channels-chat-container">
          <div className="name-display">
            <span>Select a user or channel</span>
          </div> 
          <div className="chat-messages">
          {mgaChannelMessages && mgaChannelMessages.length > 0 ? (
            mgaChannelMessages.map((msg) =>
              msg ? (
                <div
                  key={msg.id}
                  className={`chat-bubble ${
                    msg.sender?.id === receiver ? "receiver" : "sender"
                  }`}
                >
                  {msg.body}
                </div>
              ) : null
            )
          ) : (
            <div>No messages sa archives</div>
          )}
          
        </div>
        </div>
      )}

      {selectedTab === "archived" && (
        <div className="archived-chat-container">
          <div className="name-display">
            <span>Archived messages</span>
          </div> 
          <div className="chat-messages">
            <div>No messages sa channel</div>
          </div>
        </div>
      )}

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
