import React from 'react'
import styles from './HomePage.module.scss'
import { Link } from 'react-router-dom'

import { Nav } from '../../components/Home/Nav/Nav'
import { Tags } from '../../components/Home/Tags/Tags'

export const HomePage = () => {
    return(
        <>
            <Nav />
            <main className={styles.main}>
                <h1 className={styles.header}>Uśmiech, kremówka i duch papieża</h1>
                <Tags />
            </main>
        </>
    )
}