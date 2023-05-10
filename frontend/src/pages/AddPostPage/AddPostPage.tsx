import React, { useEffect, useState } from 'react'

import styles from './AddPostPage.module.scss'

import { Nav } from '../../components/Home/Nav/Nav'
import { AddPost } from '../../components/Post/Add/Add'

import rocketLeft from '../../assets/img/homepage-01.png'
import rocketRight from '../../assets/img/homepage-02.png'

export const AddPostPage = () => {
    const [scrollY, setScrollY] = useState(0)

    const handleScroll = () => {
        setScrollY(window.scrollY)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
        window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    const parallaxStyle = {
        transform: `translateY(${scrollY * 0.7}px)`
      };

    return(
        <>
        <Nav />

        <main className={styles.main}>
            <AddPost />
            <img className={styles.rocket__left} src={rocketLeft} style={parallaxStyle} />
            <img className={styles.rocket__right} src={rocketRight} style={parallaxStyle} />
        </main>
        </>
    )
}