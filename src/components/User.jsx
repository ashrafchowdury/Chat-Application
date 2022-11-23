import React, { memo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
const Avatar = lazy(() => import("./Avatar"));

const User = ({ data }) => {
  return (
    <>
      <Link to={`/users/chats?${data?.uid}`} key={data?.uid}>
        <div className="user">
          <Suspense>
            <Avatar userImg={data?.photo} />
          </Suspense>

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
