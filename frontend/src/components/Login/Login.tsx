import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Login.module.scss'

import { BsEnvelope } from 'react-icons/bs';
import { AiOutlineLock } from 'react-icons/ai';

import { handleEmailChange, handlePasswordChange } from '../../utils/eventHandlers';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        alert('Email: ' + email + ' Hasło: ' + password)
    }

    return(
        <section className={styles.container} >
            <div className={styles.container__headers}>
                <h1 className={styles.headers__header}>Zaloguj się!</h1>

                <p className={styles.headers__paragraph} >
                    Jeżeli nie posiadasz konta
                </p>

                <p className={styles.headers__paragraph}>
                    Możesz
                    <Link className={styles.headers__link} to='/registration'>Zarejestrować się tutaj!</Link>
                </p>
            </div>

            <form className={styles.form} onSubmit={event => handleSubmit(event)}>
                <label 
                    className={styles.form__label}
                    htmlFor='email'>
                    Email
                </label>
                <div className={styles.container__icon__input}>
                    <BsEnvelope className={styles.form__icon}/>   
                    <input
                        className={styles.form__input} 
                        type='email' 
                        id='email'
                        placeholder='Wpisz swój email'
                        value={email}
                        onChange={event => handleEmailChange(event, setEmail)}/>
                </div>

                <label 
                    className={styles.form__label} 
                    htmlFor='password'>
                    Hasło
                </label>
                <div className={styles.container__icon__input}>
                    <AiOutlineLock className={styles.form__icon}/>
                    <input 
                        className={styles.form__input} 
                        type='password' 
                        id='password'
                        placeholder='Wpisz swoje hasło'
                        value={password}
                        onChange={event => handlePasswordChange(event, setPassword)}/>
                </div>

                <div className={styles.container__check__forgot}>
                    <label className={styles.form__label__check}>
                        <input 
                            className={styles.form__checkbox}
                            type='checkbox'
                            name='remember-me' />
                        Zapamiętaj mnie
                    </label>

                    <Link className={styles.form__forgot} to='forgot'>Zapomniałeś hasła?</Link>
                </div>

                <button 
                    className={styles.form__button} 
                    type='submit'>
                    Zaloguj się
                </button>
            </form>
        </section>
    )
}