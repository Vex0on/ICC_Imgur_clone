import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import styles from "./PostPage.module.scss"

import { Nav } from "../../components/Home/Nav/Nav"
import { Interactions } from "../../components/Post/Interactions/Interactions"
import { Card } from "../../components/Post/Card/Card"
import { LatestPosts } from "../../components/Post/LatestPosts/LatestPosts"
import { Comments } from "../../components/Post/Comments/Comments"
import { AddComment } from "../../components/Post/Comments/AddComment/AddComment"

import { RxTriangleDown } from "react-icons/rx"
import { API_URL } from "../../services/Api/Api"

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
  imgur_user: any
  images: Array<{ image: string; name: string }>
  comments: Array<any>
}

export const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [reactions, setReactions] = useState<number | 0>(0)

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post>(`${API_URL}full-posts/${id}`)
      const reactionsResponse = await axios.get(`${API_URL}reactions/count/${0}/${id}`)
      setPost(response.data)
      setReactions(reactionsResponse.data.count)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddComment = async (newComment: any) => {
    if (post) {
      setPost({
        ...post,
        comments: [...post.comments, newComment],
      })
      await fetchPosts()
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
                postId={post.id}
                reactions={reactions}
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

              <AddComment postId={post.id} onAddComment={fetchPosts} />

              <div className={styles.container__comments}>
                <p className={styles.comments__count}>
                  {post.comments.length} Komentarzy
                </p>
                <p className={styles.comments__sort}>
                  Najnowsze <RxTriangleDown />
                </p>
              </div>

              <Comments comments={post.comments} />

              <div className={styles.container__showall}>
                <button className={styles.showall__input}>
                  Pokaż więcej komentarzy
                </button>
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
