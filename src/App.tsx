import "./index.css";
import Home from "./pages/home/Home";
import Login from "./pages/logins/Login";
import { selectCurrentUser } from "./redux/features/auth/authSlice";
import { useAppSelector } from "./redux/hooks";

function App() {
  const user = useAppSelector(selectCurrentUser);

  return <>{user ? <Home /> : <Login />}</>;
}

export default App;

//   return <>{user ? <Home /> : <Login />}</>;
