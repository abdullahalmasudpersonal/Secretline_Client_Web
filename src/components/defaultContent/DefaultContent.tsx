import "./DefaultContent.css";
import defaultImage from "../../assets/defaultImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const DefaultContent = () => {
  return (
    <div className="defaultContent">
      <div className="defaultContentInfo">
        <div>
          <img src={defaultImage} alt="" width={350} />
          <h1 style={{ marginTop: "10px" }}>Download Secretline for Mobile</h1>
          <p>
            Make calls, share your screen and get a faster experience when you
            download the Windows app.
          </p>
          <button>Get from Microsoft Store</button>
        </div>
      </div>
      <div className="defaultContentButtomMsg">
        <p style={{ margin: "auto" }}>
          <small style={{ margin: "auto", color: "rgb(175, 175, 175)" }}>
            <FontAwesomeIcon icon={faLock} fontSize={10} />
            &nbsp; Your personal messages are end-to-end encrypted
          </small>
        </p>
      </div>
    </div>
  );
};

export default DefaultContent;
