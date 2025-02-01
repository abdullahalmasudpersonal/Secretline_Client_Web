import { faCommentAlt, faGear } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MainMenu.css";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";

interface MainMenuProps {
  activeMenu: string;
  handleMainMenuClick: (menu: string) => void;
}

const MainMenu = ({ activeMenu, handleMainMenuClick }: MainMenuProps) => {
  const { data } = useGetProfileQuery({});
  const profileImg = data?.data?.profileImg || "";

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
        <div style={{ display: "flex", marginTop: "10px" }}>
          <img
            onClick={() => handleMainMenuClick("profile")}
            className={`mainManuImg ${
              activeMenu === "profile" ? "active" : ""
            }`}
            src={profileImg}
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
