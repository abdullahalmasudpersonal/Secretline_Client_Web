import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./chattingDetails.css";
import {
  faEllipsisVertical,
  faPlus,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { useEffect, useRef, useState } from "react";
import { TChat, TChatUser } from "../../types/chat.types";
import { useGetSingleMemberSingleUserChatQuery } from "../../redux/features/chat/chatApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

type ChattingDetailsProps = {
  activeSubMenu: TChatUser;
};

const ChattingDetails: React.FC<ChattingDetailsProps> = ({ activeSubMenu }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const divRef = useRef<HTMLDivElement>(null);
  // const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [hasContent, setHasContent] = useState(false);
  const { chatId, name } = activeSubMenu;
  const { data } = useGetSingleMemberSingleUserChatQuery(chatId);
  const chattingData = data?.data;

  // useEffect(() => {
  //   if (lastMessageRef.current) {
  //     lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [chattingData]); // যখন নতুন ডাটা আসবে, তখন এটি ট্রিগার হবে

  // সর্বদা চ্যাট কনটেইনারের স্ক্রল নিচে সেট করুন
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight; // সরাসরি নিচে সেট করে
    }
  }, [chattingData]); // chattingData আপডেট হলে ট্রিগার হবে

  if (!data || !Array.isArray(data.data)) {
    console.error("Data is not an array or undefined.");
    return <div>No data available</div>;
  }

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const div = divRef.current;
    if (div) {
      if (div.textContent === "") {
        div.innerHTML = "";
      }
      const text = div.textContent || "";
      setHasContent(text.length > 0);
    }
    console.log("Div content:", e.currentTarget.textContent);
  };

  return (
    <div className="chatting-details">
      <div className="chatting-details-topberPart">
        <div className="chatting-details-profile-img">
          <img
            width="50px"
            src="https://thumbs.dreamstime.com/b/portrait-young-handsome-happy-man-wearing-glasses-casual-smart-blue-clothing-yellow-color-background-square-composition-200740125.jpg"
          />
          <p style={{ margin: 0, fontWeight: 500 }}>{name}</p>
        </div>
        <div>
          <FontAwesomeIcon
            className="chatting-details-topber-icon"
            icon={faVideoCamera}
          />
          <FontAwesomeIcon
            className="chatting-details-topber-icon"
            icon={faPhone}
          />
          <FontAwesomeIcon
            className="chatting-details-topber-icon"
            icon={faEllipsisVertical}
          />
        </div>
      </div>

      <div className="chatting-details-messagesPart" ref={chatContainerRef}>
        <div className="chatting-details-message-div">
          {chattingData.map((chat: TChat, index: number) => (
            <div
              key={index}
              className="chatting-details-message-div"
              // ref={index === chattingData.length - 1 ? lastMessageRef : null}
            >
              {currentUser && (
                <div
                  className={
                    chat.senderId === currentUser.userId
                      ? "chatting-details-message-self"
                      : "chatting-details-message-reciver"
                  }
                >
                  <p style={{ margin: 0 }}>{chat.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="chatting-details-bottomberPart">
        <div className="chatting-details-add-item">
          <FontAwesomeIcon
            className="chatting-details-add-item-icon"
            icon={faPlus}
          />
        </div>
        <div className="chatting-details-text">
          <div
            ref={divRef}
            contentEditable="true"
            onInput={handleInput}
            data-placeholder="Type here message..."
          ></div>
        </div>

        {hasContent ? (
          <div>
            <FontAwesomeIcon
              className="chatting-details-send-icon"
              icon={faPaperPlane}
            />
          </div>
        ) : (
          <div>
            <FontAwesomeIcon
              className="chatting-details-voice-msg-icon"
              icon={faMicrophone}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChattingDetails;
