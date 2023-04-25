import React, { useState } from "react"
import styles from "./Nav.module.scss"
import { FiUpload, FiSearch, FiMenu } from "react-icons/fi"

export const Nav = () => {
    const [menuVisible, setMenuVisible] = useState(false)

    const handleHamburgerClick = () => {
        setMenuVisible(!menuVisible)
    }

    return(
        <>
        <nav className={`${styles.nav} ${window.scrollY > 0 ? styles.nav__scroll : ''}` }>
            <div className={styles.container__logo}>
                <p className={styles.logo}> <a href="/">Imguur </a> </p>

                <button className={styles.input__add}>Dodaj <FiUpload /> </button>
            </div>

            <FiMenu className={styles.hamburger} onClick={handleHamburgerClick} />

            <div className={`${styles.container__search} ${styles.d__none}`}>
                <input className={styles.input__search} type='text' placeholder="Wyszukaj obraz"/>
                <FiSearch className={styles.icon__search} />
            </div>

            <div className={styles.d__none}>
                <a className={styles.link__login} href="/login">Zaloguj się</a>
                <a className={styles.link__register} href="/registration">Zarejestruj się</a>
            </div>    
                
            <ul className={`${styles.menu__list} ${menuVisible ? styles.menu__show : ''}`}>
                <li><a className={styles.menu__item} href="/login">Zaloguj się</a></li>
                <li><a className={styles.menu__item} href="/registration">Zarejestruj się</a></li>
                <li>
                    <div className={`${styles.container__search} `}>
                        <input className={styles.input__search} type='text' placeholder="Wyszukaj obraz"/>
                        <FiSearch className={styles.icon__search} />
                    </div>
                </li>
            </ul>
        </nav>
        </>
    )
}