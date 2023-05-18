import React, { FormEvent, useState } from "react"
import axios from "axios"
import { AxiosError } from "axios";
import { handleChangeText } from "../../../../utils/eventHandlers"
import { refreshToken } from "../../../../utils/tokenUtils";
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken;
  
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          `${API_URL}comments`,
          {
            text: comment,
            record_id: 0,
            post: postId,
            imgur_user: decodedToken.user_id,
          },
          { headers, withCredentials: true },
        );
        console.log(response.data)
        setComment("")
        window.location.reload()
      } catch (commentError: unknown) {  
        if (axios.isAxiosError(commentError) && commentError.response?.status === 401) {
          refreshToken(() => handleSubmit(e), "/login");
        }else{
        console.error(commentError)
        }
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
