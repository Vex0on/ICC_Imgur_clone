import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import styles from './PostPage.module.scss'

import { Nav } from '../../components/Home/Nav/Nav'
import { Interactions } from '../../components/Post/Interactions/Interactions'
import { Card } from '../../components/Post/Card/Card'
import { LatestPosts } from '../../components/Post/LatestPosts/LatestPosts'
import { Comment } from '../../components/Post/Comment/Comment'

import { RxTriangleDown } from 'react-icons/rx'
import { API_URL } from '../../services/Api/Api'

interface Post {
  id: number
  title: string
  description: string
  tag: string
  expirationDate: string
  like_count: number
  dislike_count: number
  created_time: string
  updated_time: string
  imgur_user: string | null
  images: Array<{ image: string; name: string }>
  comments: Array<any>
}


export const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post>(`${API_URL}full-posts/${id}`)
      setPost(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <Nav />

      <main className={styles.main}>
        {post ? (
          <>
            <div>
              <Interactions
                likeCount={post.like_count}
                dislikeCount={post.dislike_count}
                comments={post.comments}
                imgurUser={post.imgur_user}
              />
            </div>

            <div>
              <Card
                title={post.title}
                description={post.description}
                createdTime={post.created_time}
                imgurUser={post.imgur_user}
                images={post.images}
                comments={post.comments}
              />

              <div className={styles.container__comment}>
                <input
                  className={styles.comment__input}
                  readOnly
                  type="text"
                  value="Zaloguj się aby skomentować"
                />
                <button className={styles.comment__login}>Zaloguj się</button>
              </div>

              <div className={styles.container__comments}>
                <p className={styles.comments__count}>{post.comments.length} Komentarzy</p>
                <p className={styles.comments__sort}>
                  Najnowsze <RxTriangleDown />
                </p>
              </div>

              <Comment />

              <div className={styles.container__showall}>
                <button className={styles.showall__input}>Pokaż więcej komentarzy</button>
              </div>
            </div>

            <div>
              <LatestPosts />
            </div>
          </>
        ) : (
          <p>Ładowanie danych...</p>
        )}
      </main>
    </>
  )
}
