import "./ChatWindow.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useData } from "../../../context/DataProvider.jsx";
import { API_URL } from "../../../constants/Constants.jsx";
import { BsSend } from "react-icons/bs";

function ChatWindow({ receiver, userList, channelName, selectedTab, userAvatars }) {
  console.log("Channel name in ChatWindow:", channelName);
  console.log("Props in ChatWindow - ChannelName:", channelName);
  console.log("Props in ChatWindow - Receiver:", receiver);
  
  const { userHeaders } = useData();
  const [message, setMessage] = useState("");
  const [mgaMessages, setMgaMessages] = useState([]);
  const [mgaChannelMessages, setMgaChannelMessages] = useState([]);
  
  const receiverIndex = userList.findIndex(user => user.id === receiver);
  const receiverAvatar = receiverIndex !== -1 ? userAvatars[receiverIndex] : null;
  const receiverUser = receiverIndex !== -1 ? userList[receiverIndex] : null;
    
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

    // Create a temporary message with a unique ID
    const tempMessage = {
      id: `temp-${Date.now()}`, // Temporary unique ID
      body: message.trim(),
      sender: { id: userHeaders.uid }, // Replace with your sender logic
  };
    // Optimistically update the message list
    setMgaMessages((prevMessages) => [...prevMessages, tempMessage]);
    setMessage(""); // Clear input field immediately

    try {
      const messageInfo = {
        receiver_id: Number(receiver),
        receiver_class: "User",
        body: message.trim(),
      };

      const messageChannelInfo = {
        receiver_id: Number(channelName.id),
        receiver_class: "Channel",
        body: message.trim(),
      };

     let response;
      
     response = selectedTab === "primary"
     ? await axios.post(`${API_URL}/messages`, messageInfo, { headers: userHeaders })
     : selectedTab === "channels"
     ? await axios.post(`${API_URL}/messages`, messageChannelInfo, { headers: userHeaders })
     : null

      const { data } = response; // Destructure response (get data object)
      if (data.data) {
        const newMessage = data.data;

        //if (newMessage && newMessage.id && newMessage.body) {
          // Add new valid message and deduplicate
         // setMgaMessages((prevMessages) => {
          //  const allMessages = [...prevMessages, newMessage];
           // return allMessages.filter(
            //  (msg, index, self) =>
            //    index === self.findIndex((m) => m.id === msg.id)
           // );
          //});
       // }
        //setMessage(""); // Clear input field
        // Replace the temporary message with the server response
            setMgaMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.id === tempMessage.id ? newMessage : msg
                )
            );
      }

      if (data.errors) {
        console.log("Errors:", data.errors); // Handle potential errors
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the temporary message if the API call fails
      setMgaMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== tempMessage.id)
    );
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

  const messagesEndRef = useRef(null);

  // scroll to bottom of chat
  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
      scrollToBottom(); 
  }, [mgaMessages, mgaChannelMessages]); 

  // runs only once after component mounts
  //useEffect(() => {
     // scrollToBottom(); 
 // }, []); 



  return (
    <div className="chat-window">
      
      {selectedTab === "primary" && (
        <div className="primary-chat-container">
          <div className="name-display">
          {receiverAvatar ? (
                    <img src={receiverAvatar} alt={`${receiverUser.email}'s avatar`} className="avatar" />
                ) : null}
                {receiverUser ? <span>{receiverUser.email}</span> : <span>Select a user or channel</span>}
            
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
          <div ref={messagesEndRef} />
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
      )}

      {selectedTab === "channels" && (
        <div className="channels-chat-container">
          <div className="name-display">
            <span>#{channelName.name}</span>
            </div> 
          <div className="chat-messages">
          {mgaChannelMessages && mgaChannelMessages.length > 0 ? (
            mgaChannelMessages.map((msg) =>
              msg ? (
                <div
                  key={msg.id}
                  className={`chat-bubble ${
                    msg.sender?.uid === userHeaders.uid ? "sender" : "receiver"
                  }`}
                >
                  {<strong>{msg.sender.uid.split("@")[0]}: </strong>}
                  {msg.body}
                </div>
              ) : null
            )
          ) : (
            <div>No messages sa archives</div>
          )}
          <div ref={messagesEndRef} />
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
      )}

      {selectedTab === "archived" && (
        <div className="archived-chat-container">
          <div className="name-display">
            <span>Archived Messages</span>
          </div> 
          <div className="chat-messages">
            <div>No archived messages.</div>
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
      )}

      
    </div>
  );
}

export default ChatWindow;
