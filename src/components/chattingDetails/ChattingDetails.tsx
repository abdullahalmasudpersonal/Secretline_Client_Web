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
import { TChatUser } from "../../types/chat.types";
import { useGetSingleMemberSingleUserChatQuery } from "../../redux/features/chat/chatApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateMessageMutation } from "../../redux/features/message/messageApi";
import socket from "../../utils/Socket";

type ChattingDetailsProps = {
  activeSubMenu: TChatUser;
};

const ChattingDetails: React.FC<ChattingDetailsProps> = ({ activeSubMenu }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const divRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [hasContent, setHasContent] = useState(false);
  const [message, setMessage] = useState("");
  const { chatId, name } = activeSubMenu;
  const { data } = useGetSingleMemberSingleUserChatQuery(chatId);
  const [sendMessage] = useCreateMessageMutation();
  const [messages, setMessages] = useState<
    { content: string; senderId: string }[]
  >([]);
  // const chattingData = useMemo(() => {
  //   return data?.data || [];
  // }, [data]);

  console.log("Active SubMenu:", activeSubMenu);

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
      messageType: "text",
    };

    socket.emit("sendMessage", newMessage);
    await sendMessage(newMessage).unwrap();
    if (divRef.current) {
      divRef.current.textContent = "";
    }
    setHasContent(false);
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
          {messages.map((msg, index: number) => (
            <div key={index} className="chatting-details-message-div">
              <div
                className={
                  msg?.senderId === currentUser?.userId
                    ? "chatting-details-message-self"
                    : "chatting-details-message-reciver"
                }
              >
                <p style={{ margin: 0 }}>{msg.content} </p>
              </div>
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
  );
};

export default ChattingDetails;

{
  /* {chattingData.map((chat: TChat, index: number) => (
            <div key={index} className="chatting-details-message-div">
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
          ))} */
}
{
  /* নতুন মেসেজগুলো দেখানো */
}

// // useEffect(() => {
// //   // Receive messages from server
// //   socket.on("receiveMessage", (newMessage) => {
// //     setMessages((prevMessages) => [...prevMessages, newMessage]);
// //   });

// //   return () => {
// //     socket.off("receiveMessage");
// //   };
// // }, []);

// useEffect(() => {
//   // রিসিভ মেসেজ শুনুন
//   socket.on("receiveMessage", (newMessage) => {
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   });

//   // Cleanup listener
//   return () => {
//     socket.off("receiveMessage");
//   };
// }, []);

// const [messages, setMessages] = useState<
//   { content: string; sender: string }[]
// >([]);

// useEffect(() => {
//   // রিসিভ মেসেজ আপডেট করা
//   socket.on("receiveMessage", (newMessage) => {
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   });

//   return () => {
//     socket.off("receiveMessage");
//   };
// }, []);

// socket.emit("sendMessage", newMessage);
// setMessages((prevMessages) => [...prevMessages, newMessage]);
