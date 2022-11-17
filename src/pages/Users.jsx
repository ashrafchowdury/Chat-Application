import React, { useState, useEffect } from "react";
import "../styles/pages/users/user.css";
import { Link, useNavigate } from "react-router-dom";
//
import { useAuth } from "../utils/hooks/useAuth";
import { useUsers } from "../utils/hooks/useUsers";
import { Avatar } from "../components/Avatar";
import { User } from "../components/User";
const Users = () => {
  const { user } = useUsers();
  const [sortData, setsortData] = useState([]);
  const [search, setsearch] = useState("");
  const { currentUser, name } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const ordarize_the_users = () => {
      user.map((value) => {
        if (value.token) {
          return sortData.unshift(value);
        }
        if (!value.token) {
          return sortData.push(value);
        }
      });
      let uniqueChars = sortData.filter((element, index) => {
        return sortData.indexOf(element) == index;
      });
      setsortData(uniqueChars);
    };

    ordarize_the_users();
  }, [user]);

  return (
    <>
      <nav className="user_nav">
        <div className="user_info">
          <Avatar userImg={currentUser?.photoURL} />
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
        {sortData
          .filter((value) => {
            return value?.id != currentUser?.email;
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
