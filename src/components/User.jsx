import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
export const User = ({ data }) => {
  return (
    <>
      <Link to={`/users/chats?${data?.uid}`} key={data?.uid}>
        <div className="user">
          <Avatar userImg={data?.photo} />
          <p>
            {data?.name}{" "}
            <div
              className={data?.token ? "active" : "deactive"}
              title={data?.token ? "User Active" : "User Deactive"}
            ></div>
          </p>
        </div>
      </Link>
    </>
  );
};
