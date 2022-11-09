import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
export const User = ({ data }) => {
  return (
    <>
      <Link to={`/users/chats?${data?.uid}`} key={data?.uid}>
        <div className="user">
          <div className={data?.token ? "active" : "deactive"}></div>
          <Avatar userImg={data?.photo} />
          <p>{data?.name}</p>
        </div>
      </Link>
    </>
  );
};
