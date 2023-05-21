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
import axios from 'axios'

export const Media = ({ searchTerm }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
    500: 1,
  }

  const [allImages, setAllImages] = useState([])
  const [displayedImages, setDisplayedImages] = useState([])
  const [loadedImagesCount, setLoadedImagesCount] = useState(0)

  const itemsPerPage = 10

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}full-posts`)
      const allPosts = response.data
  
      const allImages = allPosts.flatMap((post) => {
        return post.images.map((image) => ({
          ...image,
          name: post.title,
          post: post.id,
        }))
      })
      
      setAllImages(allImages)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const filteredImages = allImages.filter((image) =>
      image.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const displayedImages = filteredImages.slice(0, loadedImagesCount)
    setDisplayedImages(displayedImages)
  }, [allImages, searchTerm, loadedImagesCount])
  
  const loadMoreImages = () => {
    setLoadedImagesCount(prevCount => prevCount + itemsPerPage)
  }
  
  useEffect(() => {
    setLoadedImagesCount(itemsPerPage)
  }, [searchTerm])

    
  return (
    <div className={styles.media}>
      <InfiniteScroll
      dataLength={displayedImages.length}
      next={loadMoreImages}
      hasMore={displayedImages.length < allImages.length}
        loader={<h4>Loading...</h4>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonry__grid}
          columnClassName={styles.masonry__grid__column}
        >
        {displayedImages.map((image, index) => (
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
