import React from 'react'
import styles from './PostPage.module.scss'

import { Nav } from '../../components/Home/Nav/Nav'
import { Interactions } from '../../components/Post/Interactions/Interactions'

export const PostPage = () => {
    return(
        <>
            <Nav />

            <main>
                <div>
                    <Interactions />
                </div>

                <div>

                </div>

                <div>

                </div>
            </main>
        </>
    )
}
