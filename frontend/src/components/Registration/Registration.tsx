import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Registration.module.scss'

import { BsEnvelope } from 'react-icons/bs';
import { AiOutlineLock } from 'react-icons/ai';

export const Registration = () => {
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
            </div>

            <form className={styles.form} action=''>
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
                        placeholder='Wpisz swoje hasło'/>
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
                        placeholder='Powtórz swoje hasło'/>
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