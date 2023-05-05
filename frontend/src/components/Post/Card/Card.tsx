import React from "react"

import styles from "./Card.module.scss"

import { BsThreeDots } from "react-icons/bs"
import { AiOutlineEye } from "react-icons/ai"

interface Image {
  image: string;
  name: string;
}

interface CardProps {
  title: string
  description: string
  createdTime: string
  imgurUser: string | null
  images: Array<Image>
  comments: Array<any>
}

export const Card: React.FC<CardProps> = ({ title, description, createdTime, imgurUser, images, comments }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
  
    return `${year}-${month}-${day} ${hours}:${minutes}`
  };

  return (
    <div className={styles.container}>
      {images && images.length > 0 && (
        <>
          <img
            width="500"
            alt=""
            src={"http://localhost:8000" + images[0].image}
          />
          <div className={styles.container__title}>
            <p className={styles.title}>{title}</p>
            <BsThreeDots className={styles.title__icon} />
          </div>

          <div className={styles.container__subcard}>
            <div className={styles.container__informations}>
              <img
                width="48"
                height="48"
                className={styles.avatar}
                src="https://thumbs.dreamstime.com/b/fajne-dziecko-967772.jpg"
              />

              <div>
                <p className={styles.name}>{imgurUser || "Anonim"}</p>
                <p className={styles.date}>{formatDate(createdTime)}</p>
              </div>
            </div>

            <div className={styles.container__views}>
              <AiOutlineEye className={styles.views__icon} />
              <p className={styles.views}>4 302</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
