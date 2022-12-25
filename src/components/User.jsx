import React, { memo } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const User = ({ data }) => {
  return (
    <>
      <Link to={`/users/chats?${data?.uid}`}>
        <div className="user" data-aos="fade-up">
          <Avatar userImg={data?.photo} />

          <p className="text_skeleton">
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
export default memo(User);
