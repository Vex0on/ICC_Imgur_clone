import React from 'react'

import styles from './AddPostPage.module.scss'

import { Nav } from '../../components/Home/Nav/Nav'
import { AddPost } from '../../components/Post/Add/Add'

export const AddPostPage = () => {
    return(
        <>
        <Nav />

        <AddPost />
        </>
    )
}