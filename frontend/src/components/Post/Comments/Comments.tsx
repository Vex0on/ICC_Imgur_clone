import React, { useState } from "react"
import styles from "./Comments.module.scss"
import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx"
import axios from "axios"
import { API_URL } from "../../../services/Api/Api"
import { useParams } from "react-router-dom"
import jwt_decode from "jwt-decode"

interface ImgurUser {
  username: string
  reactions: {
    reaction: null
  }
}

interface CommentData {
  text: string
  like_count: number
  dislike_count: number
  created_time: string
  updated_time: string
  imgur_user: ImgurUser
  subcomments: any[]
  id: number
}

interface CommentsProps {
  comments: CommentData[]
}

interface DecodedToken {
  user_id: number;
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [expandedComments, setExpandedComments] = useState<number[]>([])
  const { id } = useParams<{ id: any }>()
  const [updatedComments, setUpdatedComments] =
    useState<CommentData[]>(comments)

  const toggleExpandComment = (index: number) => {
    setExpandedComments((prevExpandedComments) =>
      prevExpandedComments.includes(index)
        ? prevExpandedComments.filter(
            (expandedIndex) => expandedIndex !== index
          )
        : [...prevExpandedComments, index]
    )
  }

  const handleAddSubcomment = (
    commentIndex: number,
    text: string,
    post: number,
    comment: any,
    record_id: number = 0
  ) => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken;
      const user_id = decodedToken?.user_id;
      axios
        .post(API_URL + "subcomments/add", {
          text,
          post,
          comment,
          record_id,
          imgur_user: user_id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const newSubcomment = response.data
          const updatedCommentsCopy = [...updatedComments]
          updatedCommentsCopy[commentIndex].subcomments.push(newSubcomment)
  
          setUpdatedComments(updatedCommentsCopy)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  return (
    <>
      {updatedComments.map((comment, index) => (
        <div className={styles.main} key={index}>
          <div className={styles.comment}>
            <div className={styles.container__informations}>
              <img
                className={styles.informations__avatar}
                width="48"
                height="48"
                src="https://pliki.wiki/blog/wp-content/uploads/2020/10/1601648766.jpeg"
              />
              <p className={styles.informations__name}>
                {comment.imgur_user.username}
              </p>
              <p className={styles.informations__date}>
                {formatDate(comment.created_time)}
              </p>
            </div>

            <p className={styles.content}>{comment.text}</p>

            <div className={styles.container__interactions}>
              <RxThickArrowUp className={styles.interactions__icon} />
              <p className={styles.interactions__count}>
                {comment.like_count - comment.dislike_count}
              </p>
              <RxThickArrowDown className={styles.interactions__icon} />
              <p
                className={styles.interactions__subcomments}
                onClick={() => toggleExpandComment(index)}
              >
                +{comment.subcomments.length} odpowiedzi
              </p>
            </div>
          </div>

          {expandedComments.includes(index) && (
            <div className={styles.container__subcomments}>
              {comment.subcomments.map((subcomment, subIndex) => (
                <div className={styles.subcomment} key={subIndex}>
                  <div className={styles.container__informations}>
                    <img
                      className={styles.informations__avatar}
                      width="48"
                      height="48"
                      src="https://pliki.wiki/blog/wp-content/uploads/2020/10/1601648766.jpeg"
                    />
                    <p className={styles.informations__name}>
                      {subcomment.imgur_user.username}
                    </p>
                    <p className={styles.informations__date}>
                      {formatDate(subcomment.created_time)}
                    </p>
                  </div>

                  <p className={styles.content}>{subcomment.text}</p>

                  <div className={styles.container__interactions}>
                    <RxThickArrowUp className={styles.interactions__icon} />
                    <p className={styles.interactions__count}>
                      {subcomment.like_count - subcomment.dislike_count}
                    </p>
                    <RxThickArrowDown className={styles.interactions__icon} />
                  </div>
                </div>
              ))}

              <form
                className={styles.subcomment__form}
                onSubmit={(e) => {
                  e.preventDefault()
                  const subcommentInput = e.currentTarget.elements.namedItem(
                    "text"
                  ) as HTMLInputElement
                  handleAddSubcomment(
                    index,
                    subcommentInput.value,
                    id,
                    comment.id
                  )
                  subcommentInput.value = ""
                }}
              >
                <input
                  className={styles.subcomment__input}
                  type="text"
                  name="text"
                  placeholder="Dodaj odpowiedź"
                  required
                />
                <button className={styles.subcomment__submit} type="submit">Dodaj</button>
              </form>
            </div>
          )}
        </div>
      ))}
    </>
  )
}
