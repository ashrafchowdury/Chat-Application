import { useEffect, lazy, Suspense } from "react";
import "./styles/globals.css";
import { Route, Routes } from "react-router-dom";
// Alert Library
const Toaster = lazy(() =>
  import("react-hot-toast").then((module) => ({ default: module.Toaster }))
);
// Custom hooks
import AuthContextProvider from "./utils/hooks/useAuth";
import UserDataProvider from "./utils/hooks/useUsers";
// Pages
import Home from "./pages/Home";
const Users = lazy(() => import("./pages/Users"));
const Chats = lazy(() => import("./pages/Chats"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/404"));
// Error Boundary Component
import ErrorBoundary from "./utils/components/ErrorBoundary";
import PrivateRoute from "./utils/components/PrivateRoute";

function App() {



  return (
    <>
      <AuthContextProvider>
        <ErrorBoundary>
          <Suspense fallback={<i className="fa-solid fa-spinner"></i>}>
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
          </Suspense>
        </ErrorBoundary>
      </AuthContextProvider>
    </>
  );
}

export default App;
