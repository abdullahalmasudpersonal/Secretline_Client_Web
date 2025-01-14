import {
  faCommentAlt,
  faGear,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { useState } from "react";
import { useGetSingleMemberAllUserChatQuery } from "../../redux/features/chat/chatApi";
import { TChatUser } from "../../types/chat.types";
import ChattingDetails from "../../components/chattingDetails/ChattingDetails";

const Home = () => {
  const [activeMenu, setActiveMenu] = useState("chat");
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<TChatUser | string | null>(
    null
  );
  const handleMainMenuClick = (menu: string) => {
    if (menu !== activeMenu) {
      setActiveMenu(menu);
    }
  };
  const handleSubMenuClick = (submenu: TChatUser) => {
    setActiveChatUser(submenu.chatId);
    setActiveSubMenu(submenu);
  };
  const handleSubMenuClick2 = (submenu: string) => {
    setActiveSubMenu(submenu);
  };

  const { data: allUserChat } = useGetSingleMemberAllUserChatQuery({});
  const renderSubMenu = () => {
    switch (activeMenu) {
      case "chat":
        return (
          <>
            {allUserChat?.data?.map((item: TChatUser, index: number) => (
              <div
                className={`chattingUser ${
                  activeChatUser === item.chatId ? "activeChatUser" : ""
                }`}
                key={index}
                onClick={() => handleSubMenuClick(item)}
              >
                <div>
                  <img
                    className="profileimg"
                    src="https://thumbs.dreamstime.com/b/portrait-young-handsome-happy-man-wearing-glasses-casual-smart-blue-clothing-yellow-color-background-square-composition-200740125.jpg"
                    width="50px"
                    height="50px"
                  />
                </div>
                <div className="chattingUserInfo">
                  <div style={{ width: "100%", paddingRight: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p>{item?.name}</p>
                      <p>
                        <small>{item?.lastMessage?.timestamp}</small>
                      </p>
                    </div>
                    <p>{item?.lastMessage?.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      case "users":
        return (
          <div className="subMenuItem">
            <div onClick={() => handleSubMenuClick2("users1")}>
              Users Submenu 1
            </div>
            <div onClick={() => handleSubMenuClick2("users2")}>
              Users Submenu 2
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="subMenuItem">
            <div onClick={() => handleSubMenuClick2("settings")}>
              Settings Submenu
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="subMenuItem">
            <div onClick={() => handleSubMenuClick2("profile")}>
              Profile Submenu
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderDetailContent = () => {
    if (!activeSubMenu) {
      return <div>Default Content</div>;
    }

    // if (!activeSubMenu && !activeChatUser) {
    //   return <div>Default Content</div>;
    // }

    if (activeMenu === "chat" && typeof activeSubMenu === "object") {
      return (
        <>
          <ChattingDetails activeSubMenu={activeSubMenu} />
          {/* <h3>{activeSubMenu.name}</h3> */}
          {/* <h3>{activeSubMenu.name}</h3>
          <p>Last Message: {activeSubMenu.lastMessage?.content}</p>
          <p>Timestamp: {activeSubMenu.lastMessage?.timestamp}</p> */}
        </>
      );
    }

    switch (activeSubMenu) {
      case "users1":
        return (
          <div>
            <div>Users Submenu 1 Details</div>
          </div>
        );
      case "users2":
        return (
          <div>
            <div>Users Submenu 2 Details</div>
          </div>
        );
      case "settings":
        return (
          <div>
            <div>Settings Details</div>
          </div>
        );
      case "profile":
        return (
          <div>
            <div>Profile Details</div>
          </div>
        );
      default:
        // if (activeMenu === "chat" && typeof activeSubMenu !== "string") {
        //   return (
        //     <div>
        //       <h3>{activeSubMenu.name}</h3>
        //       <p>Last Message: {activeSubMenu.lastMessage?.content}</p>
        //       <p>Timestamp: {activeSubMenu.lastMessage?.timestamp}</p>
        //     </div>
        //   );
        // }
        return null;
    }
  };

  return (
    <div className="homePage">
      <div className="homeDiv">
        <div className="mainManu">
          <div style={{ marginTop: "5px" }}>
            <div>
              <FontAwesomeIcon
                onClick={() => handleMainMenuClick("chat")}
                className={`mainManuIcon ${
                  activeMenu === "chat" ? "active" : ""
                }`}
                icon={faCommentAlt}
              />
            </div>
            <div>
              <FontAwesomeIcon
                onClick={() => handleMainMenuClick("users")}
                className={`mainManuIcon ${
                  activeMenu === "users" ? "active" : ""
                }`}
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

        <div className="subManu">{renderSubMenu()}</div>

        <div className="detailContent">{renderDetailContent()}</div>
      </div>
    </div>
  );
};

export default Home;

/* 
   // if (activeMenu === "chat" && typeof activeSubMenu === "object") {
    //   return (
    //     <div>
    //       <h3>{activeSubMenu.name}</h3>
    //       <p>Last Message: {activeSubMenu.lastMessage?.content}</p>
    //       <p>Timestamp: {activeSubMenu.lastMessage?.timestamp}</p>
    //     </div>
    //   );
    // }

*/

/* 
  // <div className="subMenuItem">
          //   <div onClick={() => handleSubMenuClick("chat1")}>
          //     Chat Submenu 1
          //   </div>
          //   <div onClick={() => handleSubMenuClick("chat2")}>
          //     Chat Submenu 2
          //   </div>
          // </div>
*/
