import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.scss'
import { Link } from 'react-router-dom'

import { Nav } from '../../components/Home/Nav/Nav'
import { Tags } from '../../components/Home/Tags/Tags'
import { Media } from '../../components/Home/Media/Media'
import rocketLeft from '../../assets/img/homepage-01.png'
import rocketRight from '../../assets/img/homepage-02.png'

export const HomePage = () => {
    const [scrollY, setScrollY] = useState(0)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const handleScroll = () => {
        setScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
        window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const parallaxStyle = {
        transform: `translateY(${scrollY * 0.7}px)`
      }

    return(
        <>
            <Nav onSearchChange={setSearchTerm} />
            <main className={styles.main}>
                <h1 className={styles.header}>Uśmiech, kremówka i duch papieża</h1>
                <Tags />
            <Media searchTerm={searchTerm} />
                
            </main>

            <img className={styles.rocket__left} src={rocketLeft} style={parallaxStyle} />
            <img className={styles.rocket__right} src={rocketRight} style={parallaxStyle} />

        </>
    )
}