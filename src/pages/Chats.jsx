import React, { useState, useEffect } from "react";
import "../styles/pages/chat/chat.css";
import {
  onSnapshot,
  doc,
  collection,
  query,
  setDoc,
  orderBy,
  serverTimestamp,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Message } from "../components/Message";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Avatar } from "../components/Avatar";
import { useAuth } from "../utils/hooks/useAuth";
import { useUsers } from "../utils/hooks/useUsers";
import { db } from "../firebase/firebase";

const Chats = () => {
  const [message, setmessage] = useState([]);
  const [input, setinput] = useState("");
  const [image, setimage] = useState("");
  const [progress, setprogress] = useState("");
  const { currentUser } = useAuth();
  const { email, displayName } = currentUser;
  const { user } = useUsers();
  const navigate = useNavigate();
  //
  const id = window.location.search.slice(1);
  //filter chat user data
  const userData = user.filter((val) => val.uid == id).map((val) => val);
  const userId = userData[0];
  //filter my data
  const myData = user.filter((val) => val.id == email).map((val) => val);
  const myId = myData[0];
  console.log(userId);
  //automatic scroll down function
  const scroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 99999999999999999,
        behavior: "smooth",
      });
    }, 500);
  };

  //when the currentUser first time enter the chat user then create a document
  useEffect(() => {
    const create_doc = async () => {
      await setDoc(doc(db, "message", `${myId?.uid + userId?.uid}`), {
        fistUserName: displayName,
        secondUserName: userId?.name,
      });
    };
    create_doc();
  }, []);
  ///get the message data
  useEffect(() => {
    const get_msg = () => {
      const q = query(
        collection(db, "message", `${myId?.uid + userId?.uid}`, "data"),
        orderBy("timestemp", "asc")
      );
      const userData = onSnapshot(q, (snapshot) => {
        setmessage(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    get_msg();
    //
    scroll();
  }, []);

  //submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const q = query(
      collection(db, "message", `${myId?.uid + userId?.uid}`, "data")
    );
    if (!input && !image) {
      toast.error("Please Write Someting");
    } else {
      await addDoc(q, {
        img: image,
        msg: input,
        timestemp: serverTimestamp(),
        uid: currentUser.uid,
        time: `${new Date()}`,
      });
      setinput("");
      setimage("");
      //
      scroll();
    }
  };
  //upload the image on firebase storage & get the image URL
  const uploadImage = (file) => {
    const storage = getStorage();

    const storageRef = ref(storage, `${displayName}/ ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setprogress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        toast.error("Someting want wrong");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimage(downloadURL);
        });
      }
    );
  };
  return (
    <>
      <nav className="chat_nav">
        <i
          className="fas fa-chevron-left"
          onClick={() => window.history.back()}
        ></i>
        <div className="user">
          <Avatar userImg={userId.photo} />
          <h1>{userId.name}</h1>
        </div>
      </nav>

      <section className="user_chats">
        {message.map((val) => {
          return <Message val={val} userId={userId} myId={myId} />;
        })}
      </section>

      <form className="messsage_div" onSubmit={handleSubmit}>
        <div className="message">
          <div className="input_file">
            <input
              type="file"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
            <i className="fas fa-images"></i>
          </div>

          <div className="input_div">
            <span>
              <i className="fa-regular fa-message"></i>
            </span>
            <input
              type="text"
              placeholder="Write Message.."
              onChange={(e) => setinput(e.target.value)}
              value={!image ? input : image}
            />
          </div>
        </div>

        <button type="submit">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </>
  );
};

export default Chats;