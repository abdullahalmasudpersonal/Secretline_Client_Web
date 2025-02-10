import "./Home.css";
import { useState } from "react";
import { TChatUser } from "../../types/chat.types";
import ChattingDetails from "../../components/chattingDetails/ChattingDetails";
import MainMenu from "../../components/mainManu/MainManu";
import DefaultContent from "../../components/defaultContent/DefaultContent";
import SideberChat from "../../components/sideber/sideberChat/SideberChat";
import Profile from "../components/profile/Profile";
import Setting from "../components/setting/Setting";

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
              <Setting />
            </div>
          </div>
        );
      case "profile":
        return <Profile />;
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
