import React, { useState } from "react"

import styles from './AdminPage.module.scss'

import { Users } from '../../components/Admin/Users/Users'
import { Media } from "../../components/Admin/Media/Media"
import { Nav } from "../../components/Admin/Nav/Nav"
 
export const AdminPage = () => {
  const [activeLink, setActiveLink] = useState('users');

  const handleLinkClick = (link: any) => {
    setActiveLink(link);
  }

  return (
    <>
      <Nav onLinkClick={handleLinkClick} />

      <div className={styles.main} >
        {activeLink === 'users' && <Users />}
        {activeLink === 'media' && <Media />}
      </div>
    </>
  );
};
