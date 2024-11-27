import "./DirectMessages.css";
import React, { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider.jsx";
import axios from "axios";
import { API_URL } from "../../../constants/Constants.jsx";

function DirectMessages() {
    const { userHeaders } = useData();
    const [userList, setUserList] = useState([]);
    const [userAvatars, setUserAvatars] = useState([]);

    const getUsers = async () => {

        try {                                               // should be returned as objects
          const response = await axios.get(`${API_URL}/users`,  { headers : userHeaders })
                        // response.data is built-in in axios / data is property in API
          const users = response.data.data;
        //   setUserList(users);

        const filteredUsers = users.filter(user => !user.email.toLowerCase().includes("test"));
        setUserList(filteredUsers);

        const avatars = filteredUsers.map(user => {
          return `https://robohash.org/${user.email}.png?set=set4`; // Unique avatar URL
        });
        setUserAvatars(avatars);

        } catch(error) {
          if(error.response.data.errors){
            alert("Cannot get users.");
          }
        }
      }

      useEffect(() => { 
        if(userList.length === 0) {
        getUsers();}});

        // const shuffleArray = (array) => {
        //     return [...array].sort(() => Math.random() - 0.5);
        //   };

    return (
        <div className="direct-messages">
            <h3>Direct Messages</h3>
            {/* <ul>
                <li>John Doe</li>
                <li>Jane Smith</li>
            </ul> */}
            <ul>
            {
                userList &&
                userList.slice(0,6).map((individual,index) => {
                const { id, email } = individual;
                const avatar = userAvatars[index];
                const username = email.split("@")[0];
                return (
                    <li key={id}>
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