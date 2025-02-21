import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./chattingDetails.css";
import {
  faEllipsisVertical,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { useEffect, useRef, useState } from "react";
import { TChatUser } from "../../types/chat.types";
import { useGetSingleMemberSingleUserChatQuery } from "../../redux/features/chat/chatApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateMessageMutation } from "../../redux/features/message/messageApi";
import socket from "../../utils/Socket";
import OutGoingAudioCall from "./audioCall/OutGoingAudioCall";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";
import defaultProfileImg from '../../assets/porfile/profileImg.webp'
import SendFiles from "./sendFiles/SendFiles";


type ChattingDetailsProps = {
  activeSubMenu: TChatUser;
};

const ChattingDetails: React.FC<ChattingDetailsProps> = ({ activeSubMenu }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [hasContent, setHasContent] = useState(false);
  const [message, setMessage] = useState("");
  const { chatId, name, userId: activeUserId } = activeSubMenu;
  const { data } = useGetSingleMemberSingleUserChatQuery(chatId);
  const [sendMessage] = useCreateMessageMutation();
  const [messages, setMessages] = useState<
    { content: string; senderId: string }[]
  >([]);
  const { data: activeUserData } = useGetSingleUserQuery(activeUserId, {
    pollingInterval: 1000,
    skipPollingIfUnfocused: true,
  });
  const { profileImg, user: activeUser } = activeUserData?.data || {};

  // setMessages  সার্ভার থেকে মেসেজ লোড করুন
  useEffect(() => {
    if (data?.data) {
      setMessages(data?.data);
    }
  }, [data]);

  // realtime  receive Message
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  ///////  open lust message
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleInput = (/* e: React.FormEvent<HTMLDivElement> */) => {
    const div = divRef.current;
    if (div) {
      if (div.textContent === "") {
        div.innerHTML = "";
      }
      const text = div.textContent || "";
      setMessage(text.trim());
      setHasContent(text.length > 0);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const newMessage = {
      chatId: chatId,
      content: message,
      senderId: currentUser?.userId,
      messageType: "text",
    };

    socket.emit("sendMessage", newMessage);
    await sendMessage(newMessage).unwrap();
    if (divRef.current) {
      divRef.current.textContent = "";
    }
    setHasContent(false);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // এখানে আপনি file নিয়ে যেকোনো লজিক করতে পারেন
    console.log('Selected file from child:', file);
  };


  return (
    <>
      <div className="chatting-details">
        <div className="chatting-details-topberPart">
          <div className="chatting-details-profile-img">
            {activeUser?.isOnline ? <div style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: 'rgb(34, 153, 84)', position: 'absolute', marginTop: "28px", marginLeft: "30px" }}></div> : ""}
            {profileImg ? <img
              width="50px"
              src={profileImg}
            /> : <img
              width="50px"
              src={defaultProfileImg}
            />}

            <p style={{ margin: 0, fontWeight: 500 }}>{name}</p>
          </div>
          <div>
            <FontAwesomeIcon
              className="chatting-details-topber-icon"
              icon={faVideoCamera}
            />
            <OutGoingAudioCall activeUserId={activeUserId} />
            <FontAwesomeIcon
              className="chatting-details-topber-icon"
              icon={faEllipsisVertical}
            />
          </div>
        </div>

        <div className="chatting-details-messagesPart" ref={chatContainerRef}>
          <div className="chatting-details-message-div">
            {
              selectedFile ? <>  {selectedFile && (
                <div>
                  <p>Selected File: {selectedFile.name}</p>
                </div>
              )}</> : <>
                {messages.map((msg, index: number) => (
                  <div key={index} className="chatting-details-message-div">
                    <div
                      className={
                        msg?.senderId && currentUser?.userId && msg.senderId === currentUser.userId
                          ? "chatting-details-message-self"
                          : "chatting-details-message-reciver"
                      }
                    >
                      <p style={{ margin: 0 }}>{msg.content} </p>
                    </div>
                  </div>
                ))}
              </>
            }
          </div>
        </div>

        <div className="chatting-details-bottomberPart">
          <div className="chatting-details-add-item">
            <SendFiles onFileSelect={handleFileSelect} />
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
                onClick={handleSendMessage}
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
    </>
  );
};

export default ChattingDetails;
