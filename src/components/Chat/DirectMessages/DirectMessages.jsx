import "./DirectMessages.css";
import React, { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider.jsx";
import axios from "axios";
import { API_URL } from "../../../constants/Constants.jsx";
import { IoIosSearch } from "react-icons/io";

function DirectMessages({ 
  setReceiver, 
  setInbox, 
  setUserList, 
  setUserAvatars, 
  setSelectedTab, 
  searchTerm, 
  setSearchTerm }) 
  {
    const { userHeaders } = useData();
    const [userList, setLocalUserList] = useState([]);
    const [localUserAvatars, setLocalUserAvatars] = useState([]);
    // const [searchTerm, setSearchTerm] = useState("");
    
    const getUsers = async () => {

        try {
          const response = await axios.get(`${API_URL}/users`,  { headers : userHeaders });
          const users = response.data.data;
          const filteredUsers = users.filter(user => user.email !== userHeaders.uid);
          
          setUserList(filteredUsers);
          setLocalUserList(filteredUsers);
          
          const avatars = filteredUsers.map(user => {
            return `https://robohash.org/${user.email}.png?set=set4`; 
          });
          setUserAvatars(avatars);
          setLocalUserAvatars(avatars);
          
          for (const user of users) {
            const receiverId = user.id; 
            try {
              const messagesResponse = await axios.get(
                `${API_URL}/messages?receiver_id=${receiverId}&receiver_class=User`,{ headers : userHeaders }
              );
              const inboxContent = messagesResponse.data.data;
              
              if (Array.isArray(inboxContent) && inboxContent.length > 0) {
                setInbox((prevInbox) => [...prevInbox, ...inboxContent]);
              }
            } catch (error) {
                alert(error)
              }
            }

        } catch(error) {
          if(error.response.data.errors){
            alert("Cannot get users.");
          }
        }
      }

    useEffect(() => { 
      if(userList.length === 0) {
        getUsers();
      }
    }
  );
      
    const handleReceiver = (id) => {
      setReceiver(id); 
      setSelectedTab("primary");
      console.log("setReceiver(id) in DM: ", id)
    };

  const filteredUsers = userList.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
        
    return (
      <div className="direct-messages">
        <div className="search-bar-container">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
      <ul>
      {filteredUsers.map((individual, index) => {
          const { id, email } = individual;
          const avatar = localUserAvatars[index];
          const username = email.split("@")[0];
          return (
            <li key={id}
              onClick={() => handleReceiver(id)}>
              <img src={avatar} alt={`${username}'s avatar`} className="avatar" />
              <p>{username}</p>
            </li>
            )
          })
        } 
      </ul>
    </div>
  )
}

export default DirectMessages;