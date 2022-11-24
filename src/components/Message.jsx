import React, { memo, lazy } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../utils/hooks/useAuth";
//
const toast = lazy(() => import("react-hot-toast"));

const Message = ({ val, userId, myId }) => {
  const { currentUser } = useAuth();
  const handleMsgDelete = async (id) => {
    await deleteDoc(
      doc(db, "message", `${myId?.uid + userId?.uid}`, "data", id)
    );
    toast.success("Message Deleted");
  };

  const handleDownload = (imageUrl) => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.target = "_blank";
    a.click();
  };
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Message Copied");
  };

  return (
    <>
      <div
        className={val?.uid == currentUser?.uid ? "right_user" : "left_user"}
        data-aos={val?.uid == currentUser?.uid ? "fade-left" : "fade-right"}
      >
        {val.img ? (
          <>
            <div className="user_send_image">
              <img
                src={val?.img}
                alt="logo"
                onDoubleClick={() => handleDownload(val?.img)}
                loading="lazy"
              />
            </div>
            <span className="msg_time">
              {val?.time?.split(" GMT-1200 (GMT-12:00)")[0]}
            </span>
          </>
        ) : (
          <>
            <p
              onClick={() => handleCopyText(val?.msg)}
              onDoubleClick={() =>
                val?.uid == currentUser?.uid && handleMsgDelete(val?.id)
              }
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
export default memo(Message);
