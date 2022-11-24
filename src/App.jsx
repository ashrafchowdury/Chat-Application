import { useEffect } from "react";
import "./styles/globals.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
//
import AuthContextProvider from "./utils/hooks/useAuth";
import UserDataProvider from "./utils/hooks/useUsers";

//
import Home from "./pages/Home";
import Users from "./pages/Users";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      <AuthContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <UserDataProvider>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/chats" element={<Chats />} />
          </Routes>
        </UserDataProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
