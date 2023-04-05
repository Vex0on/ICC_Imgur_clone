import React from "react"

import styles from "./Nav.module.scss"

import { BsHouseGearFill, BsImageFill } from "react-icons/bs"
import { RiDashboardFill } from "react-icons/ri"
import { HiUsers } from "react-icons/hi"
import { BiLogOut } from "react-icons/bi"

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
                    <p className={styles.menu__link}>
                        <RiDashboardFill className={styles.link__icon} /> <span className={styles.link__title}> Panel </span>
                    </p> 
                </li>
                
                <div className={styles.menu__line}></div>

                <li className={styles.menu__header}>
                    Interfejs
                </li>

                <li className={styles.menu__item}>
                    <p className={styles.menu__link} onClick={() => handleLinkClick('users')}>
                        <HiUsers className={styles.link__icon} /> <span className={styles.link__title}> Użytkownicy </span>
                    </p> 
                </li>

                <li className={styles.menu__item}>
                    <p className={styles.menu__link} onClick={() => handleLinkClick('media')}>
                        <BsImageFill className={styles.link__icon} /> <span className={styles.link__title}> Obrazy </span>
                    </p>
                </li>

                <div className={styles.menu__line}></div>

                <li className={styles.menu__header}>
                    Dodatkowe
                </li>
            </ul>

            <p className={styles.logout} ><BiLogOut className={styles.logout__icon}/> Wyloguj się</p>
        </nav>
      </>
    );
};