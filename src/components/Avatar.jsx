import React from "react";
import "../styles/components/components.css";

export const Avatar = ({ userImg }) => {
  const image =
    "https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png";

  return <img src={!userImg ? image : userImg} alt="image" loading="lazy" className="avatar" />;
};
