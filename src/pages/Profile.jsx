import React, { useState, lazy, Suspense } from "react";
import "../styles/pages/profile/profile.css";
// lazy load component
const Avatar = lazy(() => import("../components/Avatar"));
//
import { useAuth } from "../utils/hooks/useAuth";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../utils/functions/imageUpload";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [username, setusername] = useState("");
  const [image, setimage] = useState("");
  const { currentUser, name, logout } = useAuth();
  const navigate = useNavigate();

  // Update User profile
  const updateUserProfile = async (e) => {
    e.preventDefault();

    if (!image && !username) {
      return;
    } else {
      try {
        // Update the authentication
        await updateProfile(currentUser, {
          displayName: username ? username : name,
          photoURL: image ? image : currentUser.photoURL,
        });
        // Update from the database
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

  //Logout user
  const handleLogout = () => {
    updateDoc(doc(db, "userInfo", `${currentUser?.email}`), {
      token: deleteField(),
    })
      .then(() => {
        logout();
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Something was wrong!");
      });
  };

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

      <form
        className="profile_update"
        onSubmit={updateUserProfile}
      >
        <div>
          <input
            type="file"
            onChange={(e) => imageUpload(e.target.files[0], "files", setimage)}
          />
          <Suspense>
            <Avatar userImg={currentUser?.photoURL} />
          </Suspense>
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
};

export default Profile;
