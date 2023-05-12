import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { Nav } from '../../components/Home/Nav/Nav'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import styles from './ProfilePage.module.scss'
import rocketLeft from '../../assets/img/homepage-01.png'
import rocketRight from '../../assets/img/homepage-02.png'
import { API_URL } from '../../services/Api/Api'
import { BsCamera } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { Media } from '../../components/Profile/Media/Media'
import { User } from '../../components/Profile/User/User'


interface User {
    id: number;
    username: string;
}

interface DecodedToken {
    user_id: string;
}

export const ProfilePage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [token, setToken] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null);

    const [view, setView] = useState('profile')

    const handleViewChange = (newView: React.SetStateAction<string>) => {
        setView(newView)
    }

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        setToken(localStorage.getItem("token") || '');
        if (token) {
          setLoggedIn(true);
        }
      }, [token]);

    useEffect(() => {
        if (token) {
          const decoded = jwt_decode(token) as DecodedToken;
          const userId = decoded?.user_id;
      
          if (userId) {
            axios.get(`${API_URL}users/${userId}`)
              .then(response => {
                setUser(response.data);
              })
              .catch(error => {
                console.error('There was an error!', error);
              });
          }
        }
      }, [token]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const parallaxStyle = {
        transform: `translateY(${scrollY * 0.7}px)`
      };

    return(
        <>
            <Nav />
            <main className={styles.main}>
                <div className={styles.profile}>
                    <div className={styles.nav}>
                        <div className={styles.nav__profile}>
                            <img
                            className={styles.nav__image}
                            width="200"
                            height="200"
                            src="https://pliki.wiki/blog/wp-content/uploads/2020/10/1601648766.jpeg"
                            />
                            <p className={styles.nav__username} >{user && user.username}</p>
                        </div>

                        <div className={styles.nav__content}>
                            <p className={styles.nav__item} onClick={() => handleViewChange('media')}>
                                <BsCamera className={styles.nav__icon} /> Wyświetl Posty
                            </p>

                            <p className={styles.nav__item} onClick={() => handleViewChange('profile')}>
                                <HiOutlineUserCircle className={styles.nav__icon} /> Edytuj Profil
                            </p>
                        </div>
                    </div>

                    <div className={styles.content}>
                        {view === 'profile' && <User userId={user && user.id} />}
                        {view === 'media' && <Media />}
                    </div>
                </div>

                <img className={styles.rocket__left} src={rocketLeft} style={parallaxStyle} />
                <img className={styles.rocket__right} src={rocketRight} style={parallaxStyle} />
            </main>

        </>
    )
}