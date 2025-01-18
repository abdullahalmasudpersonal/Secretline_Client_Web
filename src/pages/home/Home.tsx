import "./Home.css";
import { useState } from "react";
import { useGetSingleMemberAllUserChatQuery } from "../../redux/features/chat/chatApi";
import { TChatUser } from "../../types/chat.types";
import ChattingDetails from "../../components/chattingDetails/ChattingDetails";
import { formatDate } from "../../utils/lastMessageDateFromatting";
import MainMenu from "../../components/mainManu/MainManu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import DefaultContent from "../../components/defaultContent/DefaultContent";

const Home = () => {
  const [activeMenu, setActiveMenu] = useState("chat");
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<TChatUser | string | null>(
    null
  );
  const { data } = useGetProfileQuery({});
  // console.log(data, "data");

  const handleMainMenuClick = (menu: string) => {
    if (menu !== activeMenu) {
      setActiveMenu(menu);
    }
  };

  const handleSubMenuClick2 = (submenu: string) => {
    setActiveSubMenu(submenu);
  };

  const handleSubMenuClick = (submenu: TChatUser) => {
    setActiveChatUser(submenu.chatId);
    setActiveSubMenu(submenu);
  };

  const { data: allUserChat } = useGetSingleMemberAllUserChatQuery({});

  const renderSubMenu = () => {
    switch (activeMenu) {
      case "chat":
        return (
          <>
            <div className="sideberChatTopPart">
              <h2 style={{ margin: 0 }}>Chats</h2>
              <div>
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{
                    border: "2px solid rgb(211, 211, 211)",
                    color: "rgb(226, 226, 226)",
                    borderRadius: "3px",
                    padding: "0px 3px",
                    fontSize: "12px",
                    marginRight: "30px",
                    cursor: "pointer",
                  }}
                />
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  style={{
                    color: "rgb(226, 226, 226)",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
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
                        <small>
                          {formatDate(item?.lastMessage?.timestamp)}
                        </small>
                      </p>
                    </div>
                    <p>
                      {item?.lastMessage?.content
                        ? item?.lastMessage?.content?.length <= 50
                          ? item?.lastMessage?.content
                          : item?.lastMessage?.content.slice(0, 45) + "..."
                        : ""}
                    </p>
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
            <div>{data?.data?.name}</div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderDetailContent = () => {
    if (!activeSubMenu) {
      return <DefaultContent />;
    }

    if (typeof activeSubMenu === "object") {
      return (
        <>
          <ChattingDetails activeSubMenu={activeSubMenu} />
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
      default:
        return null;
    }
  };

  return (
    <div className="homePage">
      <div className="homeDiv">
        <MainMenu
          activeMenu={activeMenu}
          handleMainMenuClick={handleMainMenuClick}
        />

        <div className="subManu">{renderSubMenu()}</div>

        <div className="detailContent">{renderDetailContent()}</div>
      </div>
    </div>
  );
};

export default Home;

// case "chat":
//   return (
//     <div>
//       {chatUser.map((item) => (
//         <h6 onClick={() => handleUserClick(item)}>{item.name}</h6>
//       ))}
//     </div>
//   );

// if (activeMenu === "chat" && typeof activeSubMenu === "object") {
//   return (
//     <>
//       <ChattingDetails activeSubMenu={activeSubMenu} />
//     </>
//   );
// }

{
  /* <Sideber renderSubMenu={renderSubMenu} /> */
}

// if (!activeSubMenu && !activeChatUser) {
//   return <div>Default Content</div>;
// }

// if (activeMenu === "chat" && typeof activeSubMenu !== "string") {
//   return (
//     <div>
//       <h3>{activeSubMenu.name}</h3>
//       <p>Last Message: {activeSubMenu.lastMessage?.content}</p>
//       <p>Timestamp: {activeSubMenu.lastMessage?.timestamp}</p>
//     </div>
//   );
// }

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
