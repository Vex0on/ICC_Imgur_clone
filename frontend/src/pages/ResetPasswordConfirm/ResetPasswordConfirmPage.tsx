import React from 'react'
import { Link } from 'react-router-dom'

import { ResetPasswordConfirm } from '../../components/ResetPasswordConfirm/ResetPasswordConfirm'

import styles from './ResetPasswordConfirmPage.module.scss'

export const ResetPasswordConfirmPage = () => {
    return(
        <main className={styles.main}>
            <h1 className={styles.main__header} >Zapomniałeś hasła?</h1>

            <ResetPasswordConfirm />

            <Link to='/login'>
                <p className={styles.main__link}>Wróć do logowania</p>
            </Link>
        </main>
    )
}