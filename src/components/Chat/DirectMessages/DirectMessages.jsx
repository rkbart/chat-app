import "./DirectMessages.css";
import React, { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider.jsx";
import axios from "axios";
import { API_URL } from "../../../constants/Constants.jsx";

function DirectMessages({ setReceiver }) {
    const { userHeaders } = useData();
    const [userList, setUserList] = useState([]);
    const [userAvatars, setUserAvatars] = useState([]);
    
    const getUsers = async () => {

        try {                                               // should be returned as objects
          const response = await axios.get(`${API_URL}/users`,  { headers : userHeaders })
                        // response.data is built-in in axios / data is property in API
          const users = response.data.data;
          console.log("Unfiltered users: ", users);
        
        const filteredUsers = users.filter(user => !user.email.toLowerCase().includes("test"));
        setUserList(filteredUsers);
        console.log("Updated userList: ", filteredUsers);

        const avatars = filteredUsers.map(user => {
          return `https://robohash.org/${user.email}.png?set=set4`; // Unique avatar URL
        });
        setUserAvatars(avatars);

        // Now, loop through the filtered users and fetch the messages
        // Replacing receiver_id in API URL with the user id
            for (const user of users) {
              const receiverId = user.id; // Get the id of each user
              try {
                  const messagesResponse = await axios.get(
                      `${API_URL}/messages?receiver_id=${receiverId}&receiver_class=User`,{ headers : userHeaders }
                  );
                  console.log(`Messages for user ${receiverId}:`, messagesResponse.data);
              } catch (error) {
                  console.error(`Error fetching messages for user ${receiverId}:`, error);
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
      });
      
        const handleReceiver = (id) => {
          setReceiver(id); // Update the receiver in the parent component
        };

      return (
        <div className="direct-messages">
            <h3>Direct Messages</h3>
            <ul>
            {
                userList &&
                userList.map((individual,index) => {
                const { id, email } = individual;
                const avatar = userAvatars[index];
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