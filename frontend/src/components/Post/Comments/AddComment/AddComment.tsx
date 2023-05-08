import React, { FormEvent, useState } from "react"
import axios from "axios"

import { handleChangeText } from "../../../../utils/eventHandlers"

import styles from "./AddComment.module.scss"
import { API_URL } from "../../../../services/Api/Api"

interface CommentProps {
  postId: any
  onAddComment: (comment: any) => void
}

export const AddComment: React.FC<CommentProps> = ({
  postId,
  onAddComment,
}) => {
  const [comment, setComment] = useState<string | string>("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${API_URL}comments`,
        { text: comment, record_id: 0, post: postId, imgur_user: 2 },
        { headers: { "Content-Type": "application/json" } }
      )
      console.log(response.data)
      setComment("")
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={styles.container__comment}>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.comment__input}
            type="text"
            value={comment}
            placeholder="Dodaj komentarz"
            onChange={(event) => handleChangeText(event, setComment)}
          />
          <button className={styles.comment__login} type="submit">
            Dodaj komentarz
          </button>
        </form>
      </div>
    </>
  )
}
