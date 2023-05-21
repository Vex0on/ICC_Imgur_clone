import React, { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../../services/Api/Api"
import styles from './Media.module.scss'
import { BsEnvelope } from 'react-icons/bs'
import { Link } from "react-router-dom"

export const Media = ({ userId }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}full-posts`)
            .then(response => {
                const userPosts = response.data.filter(post => post.imgur_user.id === userId)
                setPosts(userPosts)
            })
            .catch(error => {
                console.error('There was an error!', error)
            })
    }, [userId])  

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <div key={post.id} className={styles.post}>
                    <Link to={`/post/${post.id}`}>
                        {post.images[0] && <img className={styles.post__image} src={"http://localhost:8000" + post.images[0].image} alt={post.title} />}
                        <h2 className={styles.post__title}>{post.title}</h2>
                    </Link>
                </div>
            ))}
        </div>
    )
}
