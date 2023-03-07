import React from 'react'
import { Login } from '../../components/Login/Login'
import styles from './LoginPage.module.scss'
import LoginImg from '../../assets/img/test.png'

export const LoginPage = () => {
    return(
        <main className={styles.main}>
            <span className={styles.logo} >Imguur</span>
            <Login />
            <div className={styles.container}>
                <img className={styles.img} src={LoginImg} alt="" />
                <h2 className={styles.header}>Witaj na Imguur!</h2>
                <p className={styles.sub_header} >Pokaż nam swoje zdjęcia</p>
            </div>
        </main>
    )
}