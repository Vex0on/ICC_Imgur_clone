import React from 'react'

import styles from './ResetPassword.module.scss'

import { BsEnvelope } from 'react-icons/bs'

export const ResetPassword = () => {
    return(
        <form className={styles.form}>
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
                    placeholder='Wpisz swój email'/>
            </div>

            <button 
                className={styles.form__button} 
                type='submit'>
                Resetuj hasło
            </button>
        </form>
    )
}