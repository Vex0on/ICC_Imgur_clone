import React from "react"

import styles from "./Nav.module.scss"

import { BsHouseGearFill, BsImageFill } from "react-icons/bs"
import { RiDashboardFill } from "react-icons/ri"
import { HiUsers } from "react-icons/hi"

type NavProps = {
    onLinkClick: (name: string) => void
}

export const Nav: React.FunctionComponent<NavProps> = ({ onLinkClick }) => {
    const handleLinkClick = (name: string) => {
        onLinkClick(name)
    }

    return (
      <>
        <nav className={styles.nav}>
            <p className={styles.header}>
                <BsHouseGearFill /> Admin Panel
            </p>

            <ul className={styles.menu}>
                <li className={styles.menu__item}>
                    <a className={styles.menu__link} href="#">
                        <RiDashboardFill className={styles.link__icon} /> <span className={styles.link__title}> Panel </span>
                    </a> 
                </li>
                
                <div className={styles.menu__line}></div>

                <li className={styles.menu__header}>
                    Interfejs
                </li>

                <li className={styles.menu__item}>
                    <a className={styles.menu__link} onClick={() => handleLinkClick('users')}>
                        <HiUsers className={styles.link__icon} /> <span className={styles.link__title}> Użytkownicy </span>
                    </a> 
                </li>

                <li className={styles.menu__item}>
                    <a className={styles.menu__link} onClick={() => handleLinkClick('media')}>
                        <BsImageFill className={styles.link__icon} /> <span className={styles.link__title}> Obrazy </span>
                    </a>
                </li>

                <div className={styles.menu__line}></div>

                <li className={styles.menu__header}>
                    Dodatkowe
                </li>
            </ul>

            <a className={styles.logout} href="#">Wyloguj się</a>
        </nav>
      </>
    );
};