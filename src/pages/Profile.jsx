import React, { useState } from "react";
import "../styles/pages/profile/profile.css";
import { Avatar } from "../components/Avatar";
import { useAuth } from "../utils/hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../utils/functions/imageUpload";

const Profile = () => {
  const { currentUser, name, logout } = useAuth();
  const [username, setusername] = useState("");
  const [image, setimage] = useState("");
  const navigate = useNavigate();
  const updateUserProfile = async (e) => {
    e.preventDefault();
    if (image || currentUser) {
      try {
        await updateProfile(currentUser, {
          displayName: username ? username : name,
          photoURL: image ? image : currentUser.photoURL,
        });
        await updateDoc(doc(db, "userInfo", `${currentUser?.email}`), {
          photo: image ? image : currentUser.photoURL,
          name: username ? username : name,
        });
        setusername("");
        setimage("");
        toast.success("Profile Update Successfully");
      } catch (error) {
        toast.error("Someting want wrong!");
      }
    }
  };

  const handleLogout = () => {
    if (currentUser) {
      logout();
      toast.success("Logout Successfully");
      navigate("/");
    } else {
      null;
    }
  };

  if (currentUser) {
    return (
      <>
        <nav className="profile_nav">
          <span>
            <i
              className="fa-solid fa-arrow-left"
              onClick={() => window.history.back()}
            ></i>
          </span>
          <button className="button" onClick={handleLogout}>
            Log Out
          </button>
        </nav>

        <form action="" className="profile_update" onSubmit={updateUserProfile}>
          <div>
            <input
              type="file"
              onChange={(e) =>
                imageUpload(e.target.files[0], "files", setimage)
              }
            />
            <Avatar userImg={currentUser?.photoURL} />
          </div>
          <input
            type="name"
            placeholder={name}
            onChange={(e) => setusername(e.target.value)}
            value={username}
          />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </>
    );
  } else {
    navigate("/");
  }
};

export default Profile;
