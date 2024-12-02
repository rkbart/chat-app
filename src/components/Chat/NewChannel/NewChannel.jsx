import "../NewChannel/NewChannel.css";
import { useData } from "../../../context/DataProvider.jsx";
import axios from "axios";
import { useState } from "react";

function NewChannel({  onCancel, addUser, setAddUser, userList }) {
  const { idHolder } = useData();
  const [channelName, setChannelName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  
  // const [userIds, setUserIds] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (channelName.trim()) {
      console.log(channelName)
      console.log(idHolder)
    }
    // try {
    //   const channelRequestBody = {
    //     "name": channelName,
    //     "user_ids": []
    //   }

    // } catch {

    // }
    
  }
    
  const handleCheckboxChange = (userId) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId) // Remove if already selected
        : [...prevSelected, userId] // Add if not selected
    );
  };

  return (
    <div className="backdrop">
    <form className="new-channel-container">
      <input
        type="text"
        placeholder="Enter channel name"
        autoCorrect="false"
        maxLength={15}
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <div id="buttons">
        <button onClick={handleAdd}>Add Channel</button>
      </div>
    </form>
        {/* <button onClick={onCancel}>Cancel</button> */}
        {addUser && (
        <div className="select-user-container">
          <h3>Select Users</h3>
          <ul className="user-list">
            {userList.map((individual, index) => {
              const { id, email } = individual;
              const username = email.split("@")[0];
              return (
                <li key={id} className="user-item">
                  <label>
                    <input
                      type="checkbox"
                      value={id}
                      checked={selectedUserIds.includes(id)}
                      onChange={() => handleCheckboxChange(id)}
                    />
                    {username}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>  
  );
}

export default NewChannel;
