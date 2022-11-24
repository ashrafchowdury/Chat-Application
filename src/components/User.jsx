import React, { memo, lazy, Suspense } from "react";
const Link = lazy(() =>
  import("react-router-dom").then((module) => ({ default: module.Link }))
);
const Avatar = lazy(() => import("./Avatar"));

const User = ({ data }) => {
  return (
    <>
      <Link to={`/users/chats?${data?.uid}`}>
        <div className="user" data-aos="fade-up">
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
