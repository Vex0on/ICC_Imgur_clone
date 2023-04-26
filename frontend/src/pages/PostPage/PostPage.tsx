import React from 'react'
import styles from './PostPage.module.scss'

import { Nav } from '../../components/Home/Nav/Nav'
import { Interactions } from '../../components/Post/Interactions/Interactions'
import { Card } from '../../components/Post/Card/Card'
import { LatestPosts } from '../../components/Post/LatestPosts/LatestPosts'
import { Comment } from "../../components/Post/Comment/Comment"

import { RxTriangleDown } from "react-icons/rx"

export const PostPage = () => {
    return(
        <>
            <Nav />

            <main className={styles.main}>
                <div>
                    <Interactions />
                </div>

                <div>
                    <Card />
                    
                    <div className={styles.container__comment}>
                        <input className={styles.comment__input} type="text" value="Zaloguj się aby skomentować"/>
                        <button className={styles.comment__login}>Zaloguj się</button>
                    </div>

                    <div className={styles.container__comments}>
                        <p className={styles.comments__count}>55 Komentarzy</p>
                        <p className={styles.comments__sort}>Najnowsze <RxTriangleDown /> </p>
                    </div>

                    <Comment />

                    <div className={styles.container__showall}>
                        <button className={styles.showall__input}> Pokaż więcej komentarzy </button>
                    </div>
                </div>

                <div>
                    <LatestPosts />
                </div>
            </main>
        </>
    )
}
