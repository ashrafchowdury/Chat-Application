import { useState, useEffect, createContext, useContext, lazy } from "react";
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

  // User Signup and Signin
  const signin = (email) => {
    //create paswwoed
    const password = email.slice(0, email.indexOf("@"));
    // user signup
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        //Create a doc
        setDoc(doc(db, "userInfo", email), {
          uid: Math.floor(Math.random() * 900000000000000),
          name: `${password}`, // user password is user default name
          token: Math.floor(Math.random() * 8000000000000000),
        }).then(() => {
          toast.success("Sign Up Successfully");
          navigate("/users");
        });
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          // user signin
          signInWithEmailAndPassword(auth, email, password).then(() => {
            //update the doc
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
  // user Logout
  const logout = () => {
    return signOut(auth);
  };
  // Create name for user
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
