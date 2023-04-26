import React from "react"

import styles from "./Card.module.scss"

import { BsThreeDots } from "react-icons/bs"
import { AiOutlineEye } from "react-icons/ai"

export const Card = () => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src="https://i1.nocimg.pl/s13/570/191-chlapowo-fajne-domki.jpg" />

            <div className={styles.container__title}>
                <p className={styles.title}>Ładny domek</p>
                <BsThreeDots className={styles.title__icon} />
            </div>

            <div className={styles.container__subcard}>
                <div className={styles.container__informations}>
                    <img width="48" height="48" className={styles.avatar} src="https://thumbs.dreamstime.com/b/fajne-dziecko-967772.jpg" />

                    <div>
                        <p className={styles.name}>antek321</p>
                        <p className={styles.date}>27.04.2023</p>
                    </div>
                </div>

                <div className={styles.container__views}>
                    <AiOutlineEye className={styles.views__icon} />
                    <p className={styles.views}>4 302</p>
                </div>
            </div>
        </div>
      );
}