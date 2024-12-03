import "./DirectMessages.css";
import React, { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider.jsx";
import axios from "axios";
import { API_URL } from "../../../constants/Constants.jsx";

function DirectMessages({ setReceiver,setInbox,setUserList,setUserAvatars }) {
    const { userHeaders } = useData();
    const [userList, setLocalUserList] = useState([]);
    // const [userAvatars, setUserAvatars] = useState([]);
    const [localUserAvatars, setLocalUserAvatars] = useState([]);
    
    const getUsers = async () => {

        try {
          const response = await axios.get(`${API_URL}/users`,  { headers : userHeaders });
          const users = response.data.data;
          const filteredUsers = users.filter(user => !user.email.toLowerCase().includes("test") 
          && user.email !== userHeaders.uid);
          // && user.email !== "ryan.kristopher.bartolome@gmail.com");
          setUserList(filteredUsers);
          setLocalUserList(filteredUsers);
          
          const avatars = filteredUsers.map(user => {
            return `https://robohash.org/${user.email}.png?set=set4`; // Unique avatar URL
          });
          setUserAvatars(avatars);
          setLocalUserAvatars(avatars);
          
          //get user's objects (need to filter our empty objects)
          for (const user of users) {
            const receiverId = user.id; // Get the id of each user
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
      setReceiver(id); // update the receiver in the parent component
    };
        
      return (
        <div className="direct-messages">
          {/* <h3>Direct Messages</h3> */}
            <ul>
            {
                userList &&
                userList.map((individual,index) => {
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