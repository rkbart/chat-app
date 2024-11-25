import "./DetailsSection.css";
import logo from "../../assets/ChitChat-Logo.png";

const DetailsSection = () => {
  return (<>
    <div className="details-section">
      {/* <h3>Details</h3> */}
      <img id="logo" src={logo} />
      <p>Where conversations spark and connections shine!</p>
    </div>
    {/* <button>Log out</button> */}
    {/*Welcome to ChitChat, the coziest corner of the internet where conversations flow as effortlessly as your morning coffee! Whether you’re catching up with friends, sharing secrets, or planning your next big adventure, ChitChat keeps things fun, friendly, and oh-so-relaxing. Jump in and let the chitter-chatter begin! 🌟*/}
    </>
  );
};

export default DetailsSection;
