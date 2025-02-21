import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SideberContact.css";
import {
  faArrowDown,
  faArrowLeft,
  faSearch,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useGetMyContactQuery } from "../../../../redux/features/contact/contactApi";
import { TContactList } from "../../../../types/contact.types";
import AddNewContact from "./addNewContact/AddNewContact";
import { useCreateChattingRoomMutation, useGetSingleMemberAllUserChatQuery } from "../../../../redux/features/chat/chatApi";
import { TChatUser } from "../../../../types/chat.types";

type sideberContactProps = {
  handleSubMenuClick: (value: TChatUser) => void;
  setIsNewChatVisible: (value: boolean) => void;
};

const SideberContact = ({ handleSubMenuClick, setIsNewChatVisible }: sideberContactProps) => {
  const [isFocused, setIsFocused] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [addContact, setAddContact] = useState(false);
  const { data: myContactData } = useGetMyContactQuery({});
  const [createChattingRoom] = useCreateChattingRoomMutation();
  const { data: allUserChat } = useGetSingleMemberAllUserChatQuery({});


  const resetInput = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  /// create chatting room
  const handleCreateChattingRoom = async (userId: string) => {
    setIsNewChatVisible(false);
    await createChattingRoom({ connectUserId: userId }).unwrap();
    //  handleSubMenuClick(res?._id)
    
  }

  return (
    <>
      {!addContact ? (
        <div className="newChatContainer">
          <div className="newChatTopPart">
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                style={{
                  paddingLeft: "18px",
                  paddingRight: "31px",
                  cursor: "pointer",
                }}
                onClick={() => setIsNewChatVisible(false)}
                icon={faArrowLeft}
              />{" "}
              <h3 style={{ margin: "0", fontWeight: "500" }}> New chat</h3>
            </div>
            <div className="contactSearchBer">
              <FontAwesomeIcon
                className={`contactSearchIcon ${isFocused ? "rotated" : ""}`}
                icon={isFocused ? faArrowDown : faSearch}
              />
              <input
                ref={inputRef}
                placeholder="Search name or email or number"
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
                  className="searchContactClearIcon"
                  icon={faXmark}
                  onClick={resetInput}
                />
              )}
            </div>
          </div>

          <div className="newChatButtomPart">
            <div
              style={{
                height: "100%",
              }}
            >
              <div>
                <div className="contactGroupDiv">
                  <div>
                    <FontAwesomeIcon
                      className="contactGroupIcon"
                      icon={faUsers}
                    />
                  </div>
                  <div className="contactGroupName">
                    <p>New Group</p>
                  </div>
                </div>

                <div
                  className="contactGroupDiv"
                  onClick={() => setAddContact(true)}
                >
                  <div className="contactGroupSVGIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48px"
                      width="48px"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="white"
                        d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                      />
                    </svg>
                  </div>
                  <div className="contactGroupName">
                    <p>New Contact</p>
                  </div>
                </div>

                <div className="contactGroupDiv">
                  <div>
                    <FontAwesomeIcon
                      className="contactGroupIcon"
                      icon={faUsers}
                    />
                  </div>
                  <div className="contactGroupName">
                    <p>New Community</p>
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  fontWeight: "500",
                  marginLeft: "35px",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
              >
                CONTACTS ON SECRETLINE
              </p>
              {myContactData?.data?.contacts?.map(
                (contact: TContactList, index: number) => (
                  <div className="contactUser" key={index} onClick={() => handleCreateChattingRoom(contact?.userId)}>
                    <div>
                      <svg
                        className="contactUserIcon"
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
                    <div className="contactUserInfo">
                      <div>
                        <p>{contact?.name}</p>
                        <p
                          style={{
                            paddingTop: "5px",
                            color: "rgb(157, 158, 157)",
                            fontSize: "14px",
                          }}
                        >
                          {contact?.about}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <AddNewContact setAddContact={setAddContact} />
      )}
    </>
  );
};

export default SideberContact;
