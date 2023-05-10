import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './Media.module.scss'
import { BsDownload } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
import MediaService from '../../../services/MediaServices/MediaService'
import { API_URL } from '../../../services/Api/Api'
import { Link } from 'react-router-dom'

export const Media = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
    500: 1,
  }
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])

  const fetchData = () => {
    MediaService.fetchImagesHomePage(page)
      .then((response) => {
        setImages((prevImages) => [...prevImages, ...response])
        console.log(response)
        setPage((prevPage) => prevPage + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const loadMoreImages = () => {
    fetchData()
  }

  const uniqueImages = images.reduce((accumulator, currentImage) => {
    if (!accumulator.some((image) => image.id === currentImage.id)) {
      accumulator.push(currentImage)
    }
    return accumulator
  }, [])

  return (
    <div className={styles.media}>
      <InfiniteScroll
        dataLength={uniqueImages.length}
        next={loadMoreImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonry__grid}
          columnClassName={styles.masonry__grid__column}
        >
          {uniqueImages.map((image, index) => (
            <Link to={`/post/${image.post}`} key={index}>
              <div className={styles.image__container}>
                <img src={'http://localhost:8000/' + image.image} alt={`Gallery item ${index}`} className={styles.image} />
                <div className={styles.image__info}>
                  <p className={styles.title}>{image.name}</p>
                  <div className={styles.informations}>
                    <p className={styles.downloads}>
                      <BsDownload /> 132
                    </p>
                    <p className={styles.comments}>
                      <BiCommentDetail />
                      405
                    </p>
                    <p className={styles.views}>
                      <AiOutlineEye />
                      12030
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  )
}
