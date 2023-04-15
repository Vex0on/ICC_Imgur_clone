import React, { useState, useEffect }from 'react'
import { BsPlus } from "react-icons/bs"
import styles from "./Tags.module.scss"

export const Tags = () => {
    const[showMore, setShowMore] = useState(false);

    const tagsData = [
      { id: 1, name: 'Śmieszne', count: 2103230 },
      { id: 2, name: 'MMA', count: 34 },
      { id: 3, name: 'Nieśmieszne', count: 532 },
      { id: 4, name: 'IT', count: 12232 },
      { id: 5, name: 'Chomiki', count: 14233 },
      { id: 6, name: 'Śmieszne', count: 2103230 },
      { id: 7, name: 'MMA', count: 34 },
      { id: 8, name: 'Nieśmieszne', count: 532 },
      { id: 9, name: 'IT', count: 12232 },
      { id: 10, name: 'Chomiki', count: 14233 }
    ]

    return (
      <div className={styles.tags}>
        <div className={styles.container__tags}>
          <p className={styles.tags__information}>#Tags</p>
          <p className={styles.tags__more} onClick={() => setShowMore(!showMore)}>
            Więcej <BsPlus className={styles.tags__icon} />
          </p>
        </div>
  
        <div className={`${styles.container__content} ${showMore ? styles.showMore: '' }`}>
          {tagsData.map((tag) => (
            <div key={tag.id} className={styles.tag}>
              <p className={styles.tag__name}>{tag.name}</p>
              <p className={styles.tag__count}>{tag.count} postów</p>
            </div>
          ))}
        </div>
      </div>
    )
  }