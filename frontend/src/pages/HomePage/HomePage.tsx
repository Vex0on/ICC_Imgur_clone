import React from 'react'
import styles from './HomePage.module.scss'
import { Link } from 'react-router-dom'

export const HomePage = () => {
    return(
        <>
        <Link to='registration'>Rejestracja</Link>
        <Link to='login'>Logowanie</Link>
        </>
    )
}