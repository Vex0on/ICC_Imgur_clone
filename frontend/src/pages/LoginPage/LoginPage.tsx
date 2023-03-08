import React from 'react'
import { Login } from '../../components/Login/Login'
import styles from './LoginPage.module.scss'
import LoginImg from '../../assets/img/test.png'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
    return(
        <main className={styles.main}>
            <Link to='/'><span className={styles.logo} >Imguur</span></Link>
            <Login />
            <div className={styles.container}>
                <img className={styles.container__img} src={LoginImg} alt="" />
                <h2 className={styles.container__header}>Witaj na Imguur!</h2>
                <p className={styles.container__text} >Pokaż nam swoje zdjęcia</p>
            </div>
        </main>
    )
}