import React, { useState, Fragment } from "react";
import "../styles/pages/users/user.css";
//lazy load component
import Avatar from "../components/Avatar";
//
import User from "../components/User";
import { Link } from "react-router-dom";
//Custom hooks
import { useAuth } from "../utils/hooks/useAuth";
import { useUsers } from "../utils/hooks/useUsers";

const Users = () => {
  const { user } = useUsers();
  const { currentUser, name } = useAuth();
  const [search, setsearch] = useState("");

  return (
    <>
      <nav className="user_nav" data-aos="fade-down">
        <div className="user_info">
          <Avatar userImg={currentUser?.photoURL} />

          <h1>{currentUser?.displayName ? currentUser?.displayName : name}</h1>
        </div>
        <Link to="/profile">
          <button className="button">Profile</button>
        </Link>
      </nav>

      <section className="search_section" data-aos="fade-right">
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
          ?.filter((value) => {
            return value?.id != currentUser?.email;
          })
          .filter((value) => {
            return value?.name?.toLowerCase().includes(search.toLowerCase());
          })
          .map((val) => {
            return (
              <Fragment key={val?.id}>
                <User data={val} />
              </Fragment>
            );
          })}
      </main>
    </>
  );
};

export default Users;
