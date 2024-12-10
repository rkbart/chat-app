import "./NewChannel.css";
import { useData } from "../../../context/DataProvider.jsx";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../constants/Constants.jsx";
import { IoIosSearch } from "react-icons/io";


function NewChannel({ 
    onCancel, 
    addUser, 
    userList 
    }) 
{
 
  const { idHolder } = useData();
  const [channelName, setChannelName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const { userHeaders } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = userList.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
   const handleAdd = async (e) => {
    e.preventDefault();

    if (channelName.trim()) {
      console.log(channelName)
      console.log(idHolder)
    }
    
    try {
      const channelRequestBody = {
        "name": channelName,
        "user_ids": selectedUserIds
      };

      await axios.post(`${API_URL}/channels`, channelRequestBody, {headers: userHeaders});

    } catch(error) {
      console.log(error);
    };
    setChannelName("");
    setSelectedUserIds("");
    onCancel();
  }
    
  const handleCheckboxChange = (userId) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId) 
        : [...prevSelected, userId] 
    );
  };

  const handleSelectAllChange = (isChecked) => {
    if (isChecked) {
      // Select all user IDs
      const allUserIds = userList.map((user) => user.id);
      setSelectedUserIds(allUserIds);
    } else {
      // Deselect all
      setSelectedUserIds([]);
    }
  };
  

  return (
    <div className="backdrop">
    <form className="new-channel-container"
          onSubmit={handleAdd}>
      <input
        type="text"
        placeholder="Enter channel name"
        autoCorrect="false"
        maxLength={15}
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <div id="buttons">
        <button>Save Channel</button>
      </div>
    </form>
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
        {addUser && (
        <div className="select-user-container">
          <div className="header-with-select-all">
            <h3>Add Users</h3>
            <label>
            <input
              type="checkbox"
              checked={userList.length > 0 && selectedUserIds.length === userList.length}
              onChange={(e) => handleSelectAllChange(e.target.checked)}
            />
              Select All
            </label>
          </div>
          
          <ul className="user-list">
            {filteredUsers.map((individual) => {
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
