import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signin = (email) => {
    const password = email.slice(0, email.indexOf("@"));
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setDoc(doc(db, "userInfo", email), {
          uid: Math.floor(Math.random() * 900000000000000),
          name: `${password}`,
          token: Math.floor(Math.random() * 8000000000000000),
        }).then(() => {
          toast.success("Sign Up Successfully");
          navigate("/users");
        });
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          signInWithEmailAndPassword(auth, email, password).then(() => {
            updateDoc(doc(db, "userInfo", email), {
              token: Math.floor(Math.random() * 8000000000000000),
            }).then(() => {
              toast.success("Log In Successfully");
              navigate("/users");
            });
          });
        } else {
          toast.error("Something was wrong!");
        }
      });
  };
  const logout = () => {
    return signOut(auth);
  };
  const name = currentUser?.displayName
    ? currentUser?.displayName
    : currentUser?.email?.slice(0, currentUser?.email?.indexOf("@"));

  const value = {
    currentUser,
    logout,
    signin,
    name,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
