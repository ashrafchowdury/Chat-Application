import React, { useState, useEffect, createContext, useContext } from "react";
import { db } from "../../firebase/firebase";
import { onSnapshot, collection, query } from "firebase/firestore";


export const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

const UserDataProvider = ({ children }) => {
  const [user, setuser] = useState([]);

  //get users data
  useEffect(() => {
    const q = query(collection(db, "userInfo"));
    const userData = onSnapshot(q, (snapshot) => {
      setuser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const value = {
    user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserDataProvider;
