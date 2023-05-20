import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import axios from 'axios';
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";
import { FiUpload, FiSearch, FiMenu } from "react-icons/fi";
import Logout from "../../Logout/Logout";
import { API_URL } from "../../../services/Api/Api"

interface DecodedToken {
  user_id: string;
}

interface User {
  id: number;
  username: string;
}

export const Nav = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const handleHamburgerClick = () => {
    setMenuVisible(!menuVisible);
  };

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("token") || '');
    if (token) {
      setLoggedIn(true);
    }else {
      axios
        .get("http://127.0.0.1:8000/api/token/access", {
          withCredentials: true,
          headers: { Accept: "application/json" },
        })
        .then((response) => {
          localStorage.setItem("token", response.data.access);
          setToken(response.data.access);
          setLoggedIn(true);
        })
        .catch((error) => {});
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token) as DecodedToken;
      const userId = decoded?.user_id;
  
      if (userId) {
        setLoadingUser(true);
        axios.get(`${API_URL}users/${userId}`)
          .then(response => {
            setUser(response.data);
            setLoadingUser(false);
          })
          .catch(error => {
            console.error('There was an error!', error);
            setLoadingUser(false);
          });
      }
    }
  }, [token]);

  return (
    <>
      <nav
        className={`${styles.nav} ${
          window.scrollY > 0 ? styles.nav__scroll : ""
        }`}
      >
        <div className={styles.container__logo}>
          <p className={styles.logo}>
            <Link to="/">Imguur </Link>{" "}
          </p>

          <Link to="/add/post">
        <button className={styles.input__add}>
          Dodaj<FiUpload />{" "}
        </button>
      </Link>
    </div>

    <FiMenu className={styles.hamburger} onClick={handleHamburgerClick} />

    <div className={`${styles.container__search} ${styles.d__none}`}>
      <input
        className={styles.input__search}
        type="text"
        placeholder="Wyszukaj obraz"
      />
      <FiSearch className={styles.icon__search} />
    </div>

    {loggedIn ? (
      <div className={styles.d__none}>
        <Link className={styles.link__user} to="/profile">
        <img
          className={styles.user__avatar}
          width="30"
          height="30"
          src="https://pliki.wiki/blog/wp-content/uploads/2020/10/1601648766.jpeg"
        />
        {loadingUser ? 'Loading...' : user && user.username}
      </Link>
      <Logout />
      </div>
    ) : (
      <div className={styles.d__none}>
        <Link className={styles.link__login} to="/login">
          Zaloguj się
        </Link>
        <Link className={styles.link__register} to="/registration">
          Zarejestruj się
        </Link>
      </div>
    )}

    <ul className={`${styles.menu__list} ${menuVisible ? styles.menu__show : ""}`}>
      {loggedIn ? (
        <li>
          <Logout />
        </li>
      ) : (
        <>
          <li>
            <Link className={styles.menu__item} to="/login">
              Zaloguj się
            </Link>
          </li>
          <li>
            <Link className={styles.menu__item} to="/registration">
              Zarejestruj się
            </Link>
          </li>
        </>
      )}
      <li>
        <div className={`${styles.container__search} `}>
          <input
            className={styles.input__search}
            type="text"
            placeholder="Wyszukaj obraz"
          />
          <FiSearch className={styles.icon__search} />
        </div>
      </li>
    </ul>
  </nav>
</>
);
};
