import React, { useState, Suspense, lazy } from "react";
import "../styles/pages/users/user.css";
import { Link, useNavigate } from "react-router-dom";
//
import { useAuth } from "../utils/hooks/useAuth";
import { useUsers } from "../utils/hooks/useUsers";
import User from "../components/User";
const Avatar = lazy(() => import("../components/Avatar"));

const Users = () => {
  const { user } = useUsers();
  const [search, setsearch] = useState("");
  const { currentUser, name } = useAuth();

  return (
    <>
      <nav className="user_nav">
        <div className="user_info">
          <Suspense>
            <Avatar userImg={currentUser?.photoURL} />
          </Suspense>

          <h1>{currentUser?.displayName ? currentUser?.displayName : name}</h1>
        </div>
        <Link to="/profile">
          <button className="button">Profile</button>
        </Link>
      </nav>

      <section className="search_section">
        <div className="input_div">
          <span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="search"
            placeholder="Search User"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
      </section>

      <main className="users_section">
        {user
          .filter((value) => {
            return value?.id != currentUser?.email;
          })
          .filter((value) => {
            return value?.token;
          })
          .filter((value) => {
            return value?.name?.toLowerCase().includes(search.toLowerCase());
          })
          .map((val) => {
            return <User data={val} />;
          })}
        {user
          .filter((value) => {
            return value?.id != currentUser?.email;
          })
          .filter((value) => {
            return !value?.token;
          })
          .filter((value) => {
            return value?.name?.toLowerCase().includes(search.toLowerCase());
          })
          .map((val) => {
            return <User data={val} />;
          })}
      </main>
    </>
  );
};

export default Users;
