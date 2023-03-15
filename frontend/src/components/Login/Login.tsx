import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import styles from './Login.module.scss'

import { BsEnvelope } from 'react-icons/bs';
import { AiOutlineLock } from 'react-icons/ai';

import { handleEmailChange, handlePasswordChange } from '../../utils/eventHandlers';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [currentUser, setCurrentUser] = useState(false)
    const [informationLogin, setInformationLogin] = useState('')

    const navigate = useNavigate()

    const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(email !== "" || password !== ""){
            axios.post('http://127.0.0.1:8000/api/login', { email, password })
                .then(response => {
                    setCurrentUser(true);
                    navigate('/profile', {
                        state: {
                            currentUser: true
                        }
                    })
                })
                .catch(err => {
                    setCurrentUser(false)
                    setInformationLogin('Nieprawidłowe dane logowania')
                })
        }
        else {
            setInformationLogin('Pola muszą być wypełnione')
        }
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

                {informationLogin && <p>{informationLogin}</p>}
            </div>

            <form className={styles.form} onSubmit={e => submitLogin(e)}>
                <label 
                    className={styles.form__label}
                    htmlFor='email'>
                    Email
                </label>
                <div className={styles.container__icon__input}>
                    <BsEnvelope className={styles.form__icon}/>   
                    <input
                        className={styles.form__input} 
                        name='email'
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
                        name='password' 
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

                    <Link className={styles.form__forgot} to='/reset'>Zapomniałeś hasła?</Link>
                </div>

                <input 
                    className={styles.form__button} 
                    type='submit'
                    value='Zaloguj się'/>
            </form>
        </section>
    )
}