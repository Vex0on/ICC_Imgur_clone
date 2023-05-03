import React from "react"

import styles from "./Interactions.module.scss"

import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx"
import { AiOutlineHeart, AiOutlineShareAlt, AiOutlineComment } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"

interface InteractionsProps {
  likeCount: number
  dislikeCount: number
  comments: Array<any>
  imgurUser: string | null
}

export const Interactions: React.FC<InteractionsProps> = ({ likeCount, dislikeCount, comments, imgurUser }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <RxThickArrowUp className={`${styles.icon} ${styles.like}`} />
        <p className={styles.content}>{likeCount - dislikeCount}</p>
        <RxThickArrowDown className={`${styles.icon} ${styles.dislike}`} />
        <AiOutlineHeart className={`${styles.icon} ${styles.heart}`} />
      </div>

      <div className={styles.container__share}>
        <AiOutlineShareAlt className={`${styles.icon} ${styles.comments}`} />
      </div>

      <div className={styles.container__content}>
        <AiOutlineComment className={`${styles.icon} ${styles.comments}`} />
        <p className={styles.content}>{comments.length}</p>
      </div>
    </div>
  )
}