import React from 'react'
import styles from "./Comment.module.scss"

import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx"

export const Comment = () => {
    return(
        <>
        <div className={styles.main}>
            <div className={styles.comment}>
                <div className={styles.container__informations}>
                    <img className={styles.informations__avatar} width="48" height="48" src="https://pliki.wiki/blog/wp-content/uploads/2020/10/1601648766.jpeg"/>
                    <p className={styles.informations__name}>wojtek23</p>
                    <p className={styles.informations__date}>22.02.2023 16:00</p>
                </div>
                
                <p className={styles.content}>Bardzo fajne, pozdrawiam</p>

                <div className={styles.container__interactions}>
                    <RxThickArrowUp  className={styles.interactions__icon}/>
                    <p className={styles.interactions__count}>5</p>
                    <RxThickArrowDown className={styles.interactions__icon} />
                    <p className={styles.interactions__subcomments}>- zwiń odpowiedzi</p>
                </div>
            </div>

            <div className={styles.container__subcomments}> 
                <div className={styles.subcomment}>
                    <div className={styles.container__informations}>
                        <img className={styles.informations__avatar} width="48" height="48" src="https://icdn.2cda.pl/obr/thumbs/977af986e4bf3a322d99bcbbae47840a.jpg_oooooooooo_186x.jpg"/>
                        <p className={styles.informations__name}>janusz23</p>
                        <p className={styles.informations__date}>22.02.2023 17:00</p>
                    </div>
                    
                    <p className={styles.content}>No takie se</p>

                    <div className={styles.container__interactions}>
                        <RxThickArrowUp  className={styles.interactions__icon}/>
                        <p className={styles.interactions__count}>-13</p>
                        <RxThickArrowDown className={styles.interactions__icon} />
                    </div>
                </div>

                <div className={styles.subcomment}>
                    <div className={styles.container__informations}>
                        <img className={styles.informations__avatar} width="48" height="48" src="https://memnews.pl/images/0/0/0/6/9/9/2/5/e2xdh90w.jpg"/>
                        <p className={styles.informations__name}>martyna69</p>
                        <p className={styles.informations__date}>25.02.2023 16:30</p>
                    </div>
                    
                    <p className={styles.content}>Ale jazda</p>

                    <div className={styles.container__interactions}>
                        <RxThickArrowUp  className={styles.interactions__icon}/>
                        <p className={styles.interactions__count}>34</p>
                        <RxThickArrowDown className={styles.interactions__icon} />
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.main}>
            <div className={styles.comment}>
                <div className={styles.container__informations}>
                    <img className={styles.informations__avatar} width="48" height="48" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMkrFTXs1eUytkvOU3vzuC2dZj9YUh_WIMUg&usqp=CAU"/>
                    <p className={styles.informations__name}>najlewap3248</p>
                    <p className={styles.informations__date}>22.02.2023 16:00</p>
                </div>
                
                <p className={styles.content}>No no elo elo</p>

                <div className={styles.container__interactions}>
                    <RxThickArrowUp  className={styles.interactions__icon}/>
                    <p className={styles.interactions__count}>5</p>
                    <RxThickArrowDown className={styles.interactions__icon} />
                    <p className={styles.interactions__subcomments}>+2 odpowiedzi</p>
                </div>
            </div>
        </div>
        </>
    )
}