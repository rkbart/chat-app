import "./ChatWindow.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useData } from "../../../context/DataProvider.jsx";
import { API_URL } from "../../../constants/Constants.jsx";
import { BsSend } from "react-icons/bs";
import { FaUsers, FaSmile } from "react-icons/fa";

function ChatWindow({ 
  receiver, 
  userList, 
  channelName, 
  selectedTab, 
  userAvatars, 
  channelMembers, 
  setSelectedTab, 
  setReceiver }) 
  {
  // console.log("Channel name in ChatWindow:", channelName);
  // console.log("Props in ChatWindow - ChannelName:", channelName);
  // console.log("Props in ChatWindow - Receiver:", receiver);
  // console.log("ChannelMembers in CHatWindow", channelMembers);
  
  const emojis = ["😀", "😂", "🥰", "😎", "😭", "👍", "🎉", "🔥", "💡", "💯"];
  const [showEmojis, setShowEmojis] = useState(false);
  const { userHeaders } = useData();
  const [message, setMessage] = useState("");
  const [mgaMessages, setMgaMessages] = useState([]);
  const [mgaChannelMessages, setMgaChannelMessages] = useState([]);
  const receiverIndex = userList.findIndex(user => user.id === receiver);
  const receiverAvatar = receiverIndex !== -1 ? userAvatars[receiverIndex] : null;
  const receiverUser = receiverIndex !== -1 ? userList[receiverIndex] : null;
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  
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
   
    if (selectedTab === "channels") {
      // Optimistically update the channel's message list
      setMgaChannelMessages((prevMessages) => [...prevMessages, tempMessage]);
    } else if (selectedTab === "primary") {
      // Optimistically update the DM message list
      setMgaMessages((prevMessages) => [...prevMessages, tempMessage]);
    }
    console.log("mga Channel messages: ", mgaChannelMessages)
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

      const { data } = response; 
      if (data.data) {
        const newMessage = data.data;

          setMgaMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.id === tempMessage.id ? newMessage : msg
                )
            );
      }

      if (data.errors) {
        console.log("Errors:", data.errors); 
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
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
  
  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    useEffect(() => {
      scrollToBottom(); 
  }, [mgaMessages, mgaChannelMessages]); 

  const handleDisplayMembers = () => {
    setIsMembersModalOpen(true);
  }

  const handleDms = (userId) => {
    setSelectedTab("primary");
    setIsMembersModalOpen(false)
    setReceiver(userId);
  }

  const emojiPickerRef = useRef(null);


  const handleToggleEmojis = (event) => {
    event.stopPropagation(); // Prevent immediate document click
    setShowEmojis((prev) => !prev);
  };

  const handleSelectEmoji = (emoji) => {
    setMessage((prev) => prev + emoji); // Add emoji to message input
  };

  const handleOutsideClick = (event) => {
    // Close emoji picker if clicked outside
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setShowEmojis(false);
    }
  };

  useEffect(() => {
    // Attach the event listener
    document.addEventListener("click", handleOutsideClick);
    
    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  
  return (
    <div className="chat-window">
      { selectedTab === "primary"  && (
        <div className="primary-chat-container">
          <div className="name-display">
          {receiverAvatar ? (
            <img src={receiverAvatar} alt={`${receiverUser.email}'s avatar`} className="primary-avatar" />
          ) : null }
            {receiverUser ? <span>{receiverUser.email}</span> 
            : <span>Select a user or channel</span>}
          </div>
        
        <div className="chat-messages">
          {mgaMessages.length > 0 ? (
            mgaMessages.map((msg) =>
              msg ? (
                <div key={msg.id} 
                  className={`chat-bubble ${msg.sender?.id === receiver ? "receiver" : "sender"}`}>
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
   {/* Emoji Picker */}
   {showEmojis && (
          <div className="emoji-picker" ref={emojiPickerRef}>
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className="emoji"
                onClick={() => handleSelectEmoji(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
        <FaSmile
          className="smiley-button"
          onClick={handleToggleEmojis} // Toggle emoji picker visibility
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
      <span>{`#${channelName.name}`}</span>
      <FaUsers className="view-users"
               onClick={handleDisplayMembers}  />
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
              {<strong>{msg.sender.uid}: </strong>}
              {msg.body}
            </div>
          ) : null
        )
      ) : (
        <div>No messages available</div>
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
      {/* Emoji Picker */}
   {showEmojis && (
          <div className="emoji-picker" ref={emojiPickerRef}>
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className="emoji"
                onClick={() => handleSelectEmoji(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
        <FaSmile
          className="smiley-button"
          onClick={handleToggleEmojis} 
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
      {/* Emoji Picker */}
   {showEmojis && (
          <div className="emoji-picker" ref={emojiPickerRef}>
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className="emoji"
                onClick={() => handleSelectEmoji(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
        <FaSmile
          className="smiley-button"
          onClick={handleToggleEmojis} // Toggle emoji picker visibility
        />
      <button type="submit" className="send-button">
        <BsSend />
      </button>
    </form>
  </div>
)}
  
{isMembersModalOpen && (
  <div className="modal-overlay" onClick={() => setIsMembersModalOpen(false)}>
    <div className="members-container" onClick={(e) => e.stopPropagation()}>
    <h3>{`#${channelName.name} `}</h3>
    {channelMembers && channelMembers.length > 0 ? (
        channelMembers.map((member) => {
          const matchedUser = userList.find((user) => user.id === member.user_id);
          if (matchedUser) {
            const avatarIndex = userList.findIndex((user) => user.id === matchedUser.id);
            const avatar = avatarIndex !== -1 ? userAvatars[avatarIndex] : null;

            return avatar ? (
              <div key={member.id} className="avatar-container"
              >
                <img src={avatar}
                      alt={`${matchedUser.email}'s avatar`}
                      className="members-avatar"
                      onClick={() => handleDms(matchedUser.id)}       
                />
                <div className="tooltip">
                  {matchedUser.email || matchedUser.uid}
                </div>
              </div>
            ) : null;
          }
            return null;
        })
      ) : (
        <span>Please select a channel</span>
      )  
      }     
    </div>
  </div>
)}
      
    </div>
  );
}

export default ChatWindow;
