import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "../firebase/firebase";
import { useAuth } from "../utils/hooks/useAuth";
//
import { toast } from "react-hot-toast";

export const Message = ({ val, userId, myId }) => {
  const [imgTrash, setimgTrash] = useState(false);
  //
  const { currentUser } = useAuth();
  const { email, displayName } = currentUser;

  //
  const handleMsgDelete = async (id) => {
    await deleteDoc(
      doc(db, "message", `${myId?.uid + userId?.uid}`, "data", id)
    );
    toast.success("Message Deleted");
  };

  //
  const handleImageTrash = async (id, imageUrl) => {
    //delete from document
    // const delete_doc = await deleteDoc(
    //   doc(db, "message", `${myId?.uid + userId?.uid}`, "data", id)
    // );

    //get storeage
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(storage, `ashraf chy/ashraf1.png`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("Image Deleted Successfully");
        toast.success("Image Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Someting Want Wrong");
      });
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Message Copied");
  };

  return (
    <>
      <div
        className={val?.uid == currentUser?.uid ? "right_user" : "left_user"}
        key={val?.id}
      >
        {val.img ? (
          <>
            <div className="user_send_image">
              <img src={val?.img} alt="logo" onDoubleClick={handleImageTrash} />
            </div>
            <span className="msg_time">
              {val?.time?.split(" GMT-1200 (GMT-12:00)")[0]}
            </span>
          </>
        ) : (
          <>
            <p
              onClick={() => handleCopyText(val?.msg)}
              onDoubleClick={() => handleMsgDelete(val?.id)}
            >
              {val?.msg}
            </p>
            <span className="msg_time">
              {val?.time?.split(" GMT-1200 (GMT-12:00)")[0]}
            </span>
          </>
        )}
      </div>
    </>
  );
};
