import React from 'react'
import styles from './PostPage.module.scss'

import { Nav } from '../../components/Home/Nav/Nav'
import { Interactions } from '../../components/Post/Interactions/Interactions'
import { Card } from '../../components/Post/Card/Card'
import { LatestPosts } from '../../components/Post/LatestPosts/LatestPosts'

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
                </div>

                <div>
                    <LatestPosts />
                </div>
            </main>
        </>
    )
}
