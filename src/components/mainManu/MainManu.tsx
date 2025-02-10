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
            className={`mainManuIcon ${activeMenu === "settings" ? "active" : ""
              }`}
            icon={faGear}
          />
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          {
            profileImg ? <img
              onClick={() => handleMainMenuClick("profile")}
              className={`mainManuImg ${activeMenu === "profile" ? "active" : ""
                }`}
              src={profileImg}
            /> : <div
              className={`userProfileIconDiv ${activeMenu === "profile" ? "active" : ""}`}
            >
              <svg
                onClick={() => handleMainMenuClick("profile")}
                className="mainManuProfileIcon"
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                viewBox="0 0 448 512"
              >
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                  fill="rgb(92, 92, 92)"
                />
              </svg>
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default MainMenu;
/* 
<svg
              // className="mainManuProfileIcon"
              onClick={() => handleMainMenuClick("profile")}
              className={`mainManuProfileIcon ${activeMenu === "profile" ? "active" : ""
                }`}
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              viewBox="0 0 448 512"
            >
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                fill="rgb(63, 63, 63)"
              />
            </svg>
*/