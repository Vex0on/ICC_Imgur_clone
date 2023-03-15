import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

import styles from './Registration.module.scss'

import { BsEnvelope } from 'react-icons/bs'
import { AiOutlineLock } from 'react-icons/ai'

import { handleEmailChange, handlePasswordChange, handleRepeatPasswordChange } from '../../utils/eventHandlers'

export const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [informationRegister, setInformationRegister] = useState('')

    const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInformationRegister('')
        console.log("elo")

        if(repeatPassword == password && password != "" && email != ""){
            axios.post('http://127.0.0.1:8000/api/register', { email, password })
                .then(response => {
                    setSuccess(true)
                    console.log(response.data)
                })
                .catch(err => {
                    setError(err.response.data.error)
                })
        }
        else if(password == "") {
            setInformationRegister('Hasło nie może być puste')
        }
        else if(email == "") {
            setInformationRegister('Email nie może być puste')
        }
        else {
            setInformationRegister('Hasła muszą być identyczne')
        }
        
    }

    return(
        <section className={styles.container} >
            <div className={styles.container__headers}>
                <h1 className={styles.headers__header}>Zarejestruj się!</h1>

                <p className={styles.headers__paragraph} >
                    Jeżeli posiadasz już konto
                </p>
                <p className={styles.headers__paragraph}>
                    Możesz
                    <Link className={styles.headers__link} to='/login'>Zalogować się tutaj!</Link>
                </p>

                {success && <p>Rejestracja pomyślna</p>}
                {informationRegister && <p>{informationRegister}</p>}
            </div>

            <form className={styles.form} onSubmit={e => submitRegister(e)}>
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
                        maxLength={45}
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
                        placeholder='Hasło'
                        minLength={8}
                        onChange={event => handlePasswordChange(event, setPassword)}/>
                </div>

                <label 
                    className={styles.form__label} 
                    htmlFor='repeat-password'>
                    Powtórz hasło
                </label>
                <div className={styles.container__icon__input}>
                    <AiOutlineLock className={styles.form__icon}/>
                    <input 
                        className={styles.form__input} 
                        type='password' 
                        id='repeat-password'
                        placeholder='Powtórz swoje hasło'
                        minLength={8}
                        onChange={event => handleRepeatPasswordChange(event, setRepeatPassword)}/>
                </div>

                <div className={styles.container__check__forgot}>
                    <label className={styles.form__label__check}>
                        <input 
                            className={styles.form__checkbox}
                            type='checkbox'
                            name='remember-me' />

                      Akceptuje <Link to='/regulations'>regulamin</Link>  
                    </label>
                </div>

                <button 
                    className={styles.form__button} 
                    type='submit'>
                    Zarejestruj się
                </button>
            </form>
        </section>
    )
}