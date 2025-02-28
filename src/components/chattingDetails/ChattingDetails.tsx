import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./chattingDetails.css";
import {
  faEllipsisVertical,
  faMicrophone,
  faPause,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { useEffect, useRef, useState } from "react";
import { TChatUser } from "../../types/chat.types";
import { useGetSingleMemberSingleUserChatQuery } from "../../redux/features/chat/chatApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useCreateMessageMutation,
  useCreateVoiceMessageMutation,
} from "../../redux/features/message/messageApi";
import socket from "../../utils/Socket";
import OutGoingAudioCall from "./audioCall/OutGoingAudioCall";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";
import defaultProfileImg from "../../assets/porfile/profileImg.webp";
import SendFiles from "./sendFiles/SendFiles";
// import VoiceMessage from "./voiceMessage/VoiceMessage";

const makeLinksClickable = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

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
  const [sendVoiceMessage] = useCreateVoiceMessageMutation();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // নতুন লাইন প্রতিরোধ করুন
      handleSendMessage(); // সাবমিট ফাংশন কল করুন
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); // ডিফল্ট পেস্ট একশন বন্ধ করুন
    const text = e.clipboardData.getData("text/plain"); // শুধু প্লেইন টেক্সট নিন
    document.execCommand("insertText", false, text); // টেক্সট ইনসার্ট করুন
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
    console.log("Selected file from child:", file);
  };

  // ///////////////////////////////////////////
  const [recording, setRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecorded, setIsRecorded] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [soundLevel, setSoundLevel] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let microphone: MediaStreamAudioSourceNode | null = null;

    if (recording) {
      setRecordingTime(0);
      timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // মাইক্রোফোন থেকে ইনপুট নেওয়া এবং স্পাইক তৈরি করা
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateSoundLevel = () => {
          if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            setSoundLevel(avg);
          }
          requestAnimationFrame(updateSoundLevel);
        };
        updateSoundLevel();
      });
    } else {
      clearInterval(timer);
      setSoundLevel(0);
    }

    return () => {
      clearInterval(timer);
      if (audioContext) audioContext.close();
    };
  }, [recording]);

  // ⏳ সময় ফরম্যাট করা (মিনিট:সেকেন্ড)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 🎤 রেকর্ডিং শুরু (ক্লিক করলে লক হবে)
  const toggleRecording = async () => {
    if (recording) {
      // রেকর্ডিং বন্ধ করা
      mediaRecorderRef.current?.stop();
      setRecording(false);
    } else {
      // রেকর্ডিং শুরু করা
      // setAudioUrl(null);
      // setIsRecorded(false);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        // audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
          setIsRecorded(true);
        };

        mediaRecorder.start();
        setRecording(true);
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    }
  };

  const handleVoiceMessage = async () => {
    if (audioUrl) {
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob(); // Blob-এ কনভার্ট করা
      const formData = new FormData();
      formData.append("audio", audioBlob, "voice-message.webm");
      console.log(audioBlob, "audioBlob", audioUrl);

      try {
        const res = await sendVoiceMessage(formData).unwrap();
        console.log(res);
        //   if (res.ok) {
        //     alert("Voice message sent successfully!");
        //     cancelRecording();
        //   } else {
        //     alert("Failed to send voice message.");
        //   }
        // } catch (error) {
        //   console.error("Error uploading voice message:", error);
        // }
      } catch (error) {
        console.error("Error uploading voice message:", error);
      }
    }
  };

  return (
    <>
      <div className="chatting-details">
        <div className="chatting-details-topberPart">
          <div className="chatting-details-profile-img">
            {activeUser?.isOnline ? (
              <div
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  backgroundColor: "rgb(34, 153, 84)",
                  position: "absolute",
                  marginTop: "28px",
                  marginLeft: "30px",
                }}
              ></div>
            ) : (
              ""
            )}
            {profileImg ? (
              <img width="50px" src={profileImg} />
            ) : (
              <img width="50px" src={defaultProfileImg} />
            )}

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
            {selectedFile ? (
              <>
                {" "}
                {selectedFile && (
                  <div>
                    <p>Selected File: {selectedFile.name}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {messages.map((msg, index: number) => (
                  <div key={index} className="chatting-details-message-div">
                    <div
                      className={
                        msg?.senderId &&
                        currentUser?.userId &&
                        msg.senderId === currentUser.userId
                          ? "chatting-details-message-self"
                          : "chatting-details-message-reciver"
                      }
                    >
                      <p style={{ margin: 0 }}>
                        {makeLinksClickable(msg.content)}{" "}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="chatting-details-bottomberPart">
          {recording || audioUrl ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {/* রেকর্ডিং হলে সময় দেখানো */}
              {recording && (
                <span
                  style={{
                    color: "black",
                    fontSize: "20px",
                    background: "gray",
                    padding: "4px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                >
                  {formatTime(recordingTime)}
                </span>
              )}
              {/* স্পাইক ভিজুয়ালাইজেশন */}
              {recording && (
                <div
                  style={{
                    width: "50px",
                    height: "10px",
                    backgroundColor: "red",
                    transform: `scaleY(${soundLevel / 100})`,
                    transition: "transform 0.1s ease-in-out",
                    marginRight: "10px",
                  }}
                ></div>
              )}
              {/* 🎵 রেকর্ডেড অডিও প্লে অপশন */}
              {audioUrl && !recording && (
                <audio controls>
                  <source src={audioUrl} type="audio/webm" />
                </audio>
              )}
              <FontAwesomeIcon
                onClick={toggleRecording}
                icon={recording ? faPause : faMicrophone}
                style={{
                  color: "red",
                  border: "2px solid red",
                  borderRadius: "50%",
                  padding: "3px 6px",
                  cursor: "pointer",
                }}
              />
              <FontAwesomeIcon
                className="chatting-details-send-icon"
                icon={faPaperPlane}
                onClick={handleVoiceMessage}
              />
            </div>
          ) : (
            <>
              <div className="chatting-details-add-item">
                <SendFiles onFileSelect={handleFileSelect} />
              </div>
              <div className="chatting-details-text">
                <div
                  ref={divRef}
                  contentEditable="true"
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
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
                    onClick={toggleRecording}
                    className="chatting-details-voice-msg-icon"
                    icon={faMicrophone}
                    style={{ color: "white" }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChattingDetails;

{
  /* <VoiceMessage
                recording={recording}
                setRecording={setRecording}
                audioUrl={audioUrl}
                setAudioUrl={setAudioUrl}
              /> */
}
