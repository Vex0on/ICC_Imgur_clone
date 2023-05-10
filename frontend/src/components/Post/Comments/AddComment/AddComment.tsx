import React, { FormEvent, useState } from "react"
import axios from "axios"

import { handleChangeText } from "../../../../utils/eventHandlers"

import styles from "./AddComment.module.scss"
import { API_URL } from "../../../../services/Api/Api"
import jwt_decode from "jwt-decode"

interface CommentProps {
  postId: any
  onAddComment: (comment: any) => void
}

interface DecodedToken {
  user_id: number;
}

export const AddComment: React.FC<CommentProps> = ({
  postId,
  onAddComment,
}) => {
  const [comment, setComment] = useState<string | string>("")
  const [user_id, setUser_id] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken;
      setUser_id(decodedToken.user_id);
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        };
        const response = await axios.post(
          `${API_URL}comments`,
          { text: comment, record_id: 0, post: postId, imgur_user: user_id },
          { headers }
        )
        console.log(response.data)
        setComment("")
        window.location.reload()
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <div>
        <form className={styles.container__comment} onSubmit={handleSubmit}>
          <input
            className={styles.comment__input}
            type="text"
            value={comment}
            placeholder="Dodaj komentarz"
            onChange={(event) => handleChangeText(event, setComment)}
          />
          <button className={styles.comment__login} type="submit">
            Dodaj 
          </button>
        </form>
      </div>
    </>
  )
}
