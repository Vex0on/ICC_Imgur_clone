import React, { useEffect, useState } from "react"
import styles from "./Nav.module.scss"
import { Link } from "react-router-dom"
import { FiUpload, FiSearch, FiMenu } from "react-icons/fi"

export const Nav = () => {
    const [menuVisible, setMenuVisible] = useState(false)

    const handleHamburgerClick = () => {
        setMenuVisible(!menuVisible)
    }
    
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <>
        <nav className={`${styles.nav} ${window.scrollY > 0 ? styles.nav__scroll : ''}` }>
            <div className={styles.container__logo}>
                <p className={styles.logo}> <Link to="/">Imguur </Link> </p>

                <Link to="/add/post"><button className={styles.input__add}>Dodaj<FiUpload /> </button></Link>
            </div>

            <FiMenu className={styles.hamburger} onClick={handleHamburgerClick} />

            <div className={`${styles.container__search} ${styles.d__none}`}>
                <input className={styles.input__search} type='text' placeholder="Wyszukaj obraz"/>
                <FiSearch className={styles.icon__search} />
            </div>

            <div className={styles.d__none}>
                <Link className={styles.link__login} to="/login">Zaloguj się</Link>
                <Link className={styles.link__register} to="/registration">Zarejestruj się</Link>
            </div>    
                
            <ul className={`${styles.menu__list} ${menuVisible ? styles.menu__show : ''}`}>
                <li><Link className={styles.menu__item} to="/login">Zaloguj się</Link></li>
                <li><Link className={styles.menu__item} to="/registration">Zarejestruj się</Link></li>
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