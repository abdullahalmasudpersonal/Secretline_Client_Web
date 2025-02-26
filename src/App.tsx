import IncomingAudioCall from "./components/chattingDetails/audioCall/IncomingAudioCall";
import "./index.css";
import Home from "./pages/home/Home";
import Login from "./pages/logins/Login";
import { selectCurrentUser } from "./redux/features/auth/authSlice";
import { useAppSelector } from "./redux/hooks";
import socket from "./utils/Socket";
function App() {
  const user = useAppSelector(selectCurrentUser);
  socket.on("connect", () => {
    socket.emit("userOnline", user?.userId);
  });

  return (
    <>
      <IncomingAudioCall />
      {user ? <Home /> : <Login />}
    </>
  );
}

export default App;
