import {
  faArrowDown,
  faEllipsisVertical,
  faLock,
  faPlus,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TChatUser } from "../../../types/chat.types";
import { formatDate } from "../../../utils/lastMessageDateFromatting";
import { useRef, useState } from "react";
import { useGetSingleMemberAllUserChatQuery } from "../../../redux/features/chat/chatApi";
import "./SideberChat.css";
import SideberContact from "./sideberContact/SideberContact";

type SidebarChatProps = {
  handleSubMenuClick: (submenu: TChatUser) => void;
  activeChatUser: string | null;
};

const SideberChat = ({
  handleSubMenuClick,
  activeChatUser,
}: SidebarChatProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isNewChatVisible, setIsNewChatVisible] = useState(false);
  const { data: allUserChat } = useGetSingleMemberAllUserChatQuery({});

  const resetInput = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleNewChatClick = () => {
    setIsNewChatVisible(true);
  };

  return (
    <>
      {!isNewChatVisible ? (
        <div className="sideberChat">
          <div className="sideberChatTopPart">
            <div>
              <h2 style={{ margin: 0 }}>Chats</h2>
              <div>
                <FontAwesomeIcon
                  onClick={handleNewChatClick}
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
            <div className="chatSearchBer">
              <FontAwesomeIcon
                className={`chatSearchIcon ${isFocused ? "rotated" : ""}`}
                icon={isFocused ? faArrowDown : faSearch}
              />
              <input
                ref={inputRef}
                placeholder={isFocused ? "" : "Search"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  if (inputValue === "") {
                    setIsFocused(false);
                  }
                }}
              />
              {inputValue && (
                <FontAwesomeIcon
                  className="chatCloseIcon"
                  icon={faXmark}
                  onClick={resetInput}
                />
              )}
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
                <svg
                  className="chattingUserIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                    fill="rgb(197, 197, 197)"
                  />
                </svg>
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
                      <small>{formatDate(item?.lastMessage?.timestamp)}</small>
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

          <div className="sideberChatButtomPart">
            <p
              style={{
                textAlign: "center",
                borderTop: "1px solid gray",
                margin: "0px 15px 15px 15px",
                paddingTop: "10px",
              }}
            >
              <FontAwesomeIcon icon={faLock} fontSize={10} />
              <small> Your personal messages are end-to-end encrypted</small>
            </p>
          </div>
        </div>
      ) : (
        <SideberContact setIsNewChatVisible={setIsNewChatVisible} />
      )}
    </>
  );
};

export default SideberChat;
