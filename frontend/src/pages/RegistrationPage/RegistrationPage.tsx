import React from 'react'
import { Link } from 'react-router-dom'

import { Registration } from '../../components/Registration/Registration'

import styles from './RegistrationPage.module.scss'

import RegistrationImg from '../../assets/img/registration-01.png'

export const RegistrationPage = () => {
    return(
        <main className={styles.main}>
            <div className={styles.container}>
                <img className={styles.container__img} src={RegistrationImg} alt="" />
                <h2 className={styles.container__header}>Zarejestruj się do Imguur!</h2>
                <p className={styles.container__text} >Podziel się swoimi zdjęciami</p>
            </div>
            <Link to='/'><span className={styles.logo} >Imguur</span></Link>
            <Registration />
        </main>
    )
}