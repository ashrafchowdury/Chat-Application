import React, { memo } from "react";
import "../styles/components/components.css";

const Avatar = ({ userImg }) => {
  //default image
  const image =
    "https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png";
  return (
    <>
      <img
        src={!userImg ? image : userImg}
        alt="image"
        loading="lazy"
        className="avatar"
      />
    </>
  );
};
export default memo(Avatar);
