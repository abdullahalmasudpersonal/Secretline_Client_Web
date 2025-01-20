import "./Home.css";
import { useState } from "react";
import { TChatUser } from "../../types/chat.types";
import ChattingDetails from "../../components/chattingDetails/ChattingDetails";
import MainMenu from "../../components/mainManu/MainManu";

import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import DefaultContent from "../../components/defaultContent/DefaultContent";
import SideberChat from "../../components/sideber/sideberChat/SideberChat";

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

  const renderSubMenu = () => {
    switch (activeMenu) {
      case "chat":
        return (
          <SideberChat
            handleSubMenuClick={handleSubMenuClick}
            activeChatUser={activeChatUser}
          />
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
