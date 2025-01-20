import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SideberContact.css";
import {
  faArrowDown,
  faArrowLeft,
  faSearch,
  faUserCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useGetMyContactQuery } from "../../../../redux/features/contact/contactApi";
import { TContactList } from "../../../../types/contact.types";

type sideberContactProps = {
  setIsNewChatVisible: (value: boolean) => void;
};

const SideberContact = ({ setIsNewChatVisible }: sideberContactProps) => {
  const [isFocused, setIsFocused] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: myContactData } = useGetMyContactQuery({});
  console.log(myContactData, "mycontactdata");

  const resetInput = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="newChatContainer">
      <div className="newChatTopPart">
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon
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
      <div>
        <div>
          <div style={{ display: "flex", gap: "15px", paddingLeft: "13px" }}>
            <FontAwesomeIcon className="contactUserIcon" icon={faUserCircle} />
            <p>New Group</p>
          </div>
        </div>
        <div>
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
          <>
            {myContactData?.data?.contacts?.map(
              (contact: TContactList, index: number) => (
                <div className="contactUser" key={index}>
                  <div>
                    <FontAwesomeIcon
                      className="contactUserIcon"
                      icon={faUserCircle}
                    />
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
          </>
        </div>
      </div>
    </div>
  );
};

export default SideberContact;
