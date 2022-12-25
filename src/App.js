import { useEffect, lazy, Suspense } from "react";
import "./styles/globals.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Chats from "./pages/Chats";
import NotFound from "./pages/404";
import Profile from "./pages/Profile";
// Error Boundary Component
import ErrorBoundary from "./utils/components/ErrorBoundary";
import PrivateRoute from "./utils/components/PrivateRoute";
// Custom hooks
import AuthContextProvider from "./utils/hooks/useAuth";
import UserDataProvider from "./utils/hooks/useUsers";
// Alert Library
import { Toaster } from "react-hot-toast";
// Animation library
import AOS from "aos";
import "aos/dist/aos.css";
// Custom hooks

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <AuthContextProvider>
        <ErrorBoundary>
          <Toaster position="top-center" reverseOrder={false} />
          <UserDataProvider>
            <Routes>
              {/*** Privet Route ****/}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/chats" element={<Chats />} />
              </Route>

              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserDataProvider>
        </ErrorBoundary>
      </AuthContextProvider>
    </>
  );
}

export default App;
