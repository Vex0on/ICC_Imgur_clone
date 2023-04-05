import React, { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

import styles from './AdminPage.module.scss'

import { Users } from '../../components/Admin/Users/Users'
import { Media } from "../../components/Admin/Media/Media"
import { Nav } from "../../components/Admin/Nav/Nav"
 
export const AdminPage = () => {
  const [activeLink, setActiveLink] = useState('users');
  const [superUser, setSuperUser] = useState(false);

  const handleLinkClick = (link: any) => {
    setActiveLink(link);
  }

  const navigate = useNavigate()

  useEffect(() => {
    try {
      const token = localStorage.getItem("token")
      if (token !== null) {
        const decoded: any = jwt_decode(token)
        setSuperUser(decoded.is_superuser)
        
        if (decoded.is_superuser === true) {
          console.log("Użytkownik jest superadministratorem")
        } else {
          console.log("Użytkownik nie jest superadministratorem")
          navigate('/login')
        }
    
      } else {
        console.log("Nie znaleziono tokenu w Local Storage");
      }
    } catch (error) {
      console.log("Błąd dekodowania tokena JWT", error);
      navigate('/login')
    }
  }, []);


  return (
    <>
      {superUser && (
        <>
          <Nav onLinkClick={handleLinkClick} />

          <div className={styles.main}>
            {activeLink === 'users' && <Users />}
            {activeLink === 'media' && <Media />}
          </div>
        </>
      )}
    </>
  );
};


