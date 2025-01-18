import {
  faCommentAlt,
  faGear,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MainMenu.css";

interface MainMenuProps {
  activeMenu: string;
  handleMainMenuClick: (menu: string) => void;
}

const MainMenu = ({ activeMenu, handleMainMenuClick }: MainMenuProps) => {
  return (
    <div className="mainManu">
      <div style={{ marginTop: "5px" }}>
        <div>
          <FontAwesomeIcon
            onClick={() => handleMainMenuClick("chat")}
            className={`mainManuIcon ${activeMenu === "chat" ? "active" : ""}`}
            icon={faCommentAlt}
          />
        </div>
        <div>
          <FontAwesomeIcon
            onClick={() => handleMainMenuClick("users")}
            className={`mainManuIcon ${activeMenu === "users" ? "active" : ""}`}
            icon={faUsers}
            style={{ fontSize: "20px", padding: "12px 10px" }}
          />
        </div>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <div>
          <FontAwesomeIcon
            onClick={() => handleMainMenuClick("settings")}
            className={`mainManuIcon ${
              activeMenu === "settings" ? "active" : ""
            }`}
            icon={faGear}
          />
        </div>
        <div>
          <FontAwesomeIcon
            onClick={() => handleMainMenuClick("profile")}
            className={`mainManuIcon ${
              activeMenu === "profile" ? "active" : ""
            }`}
            icon={faUserCircle}
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
