import React from 'react'
import styles from "./Media.module.scss"
import Masonry from 'react-masonry-css'
import { BsDownload } from "react-icons/bs"
import { BiCommentDetail } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'

export const Media = () => {
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 2,
        500: 1,
      }

      const images = [
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/jak-zrobic-klimatyczne-zdjecie-1.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://img.freepik.com/premium-zdjecie/ladne-zdjecie-zachodu-slonca-w-polu-z-pochmurnego-nieba_162447-19.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/472.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://img.freepik.com/premium-zdjecie/ladne-zdjecie-zachodu-slonca-w-polu-z-pochmurnego-nieba_162447-19.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/472.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/jak-zrobic-klimatyczne-zdjecie-1.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://img.freepik.com/premium-zdjecie/ladne-zdjecie-zachodu-slonca-w-polu-z-pochmurnego-nieba_162447-19.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/472.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://img.freepik.com/premium-zdjecie/ladne-zdjecie-zachodu-slonca-w-polu-z-pochmurnego-nieba_162447-19.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/472.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/jak-zrobic-klimatyczne-zdjecie-1.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://img.freepik.com/premium-zdjecie/ladne-zdjecie-zachodu-slonca-w-polu-z-pochmurnego-nieba_162447-19.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/472.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://img.freepik.com/premium-zdjecie/ladne-zdjecie-zachodu-slonca-w-polu-z-pochmurnego-nieba_162447-19.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/472.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/jak-zrobic-klimatyczne-zdjecie-1.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://img.freepik.com/premium-zdjecie/ladne-zdjecie-zachodu-slonca-w-polu-z-pochmurnego-nieba_162447-19.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/472.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://img.freepik.com/premium-zdjecie/ladne-zdjecie-zachodu-slonca-w-polu-z-pochmurnego-nieba_162447-19.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
        {
            url: 'https://agwerblog.pl/wp-content/uploads/2017/11/472.jpg',
            title: 'Obraz 1',
            views: 100,
            downloads: 120,
            comments: 120
        },
      ]

    return(
        <div className={styles.media}>
            <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonry__grid}
            columnClassName={styles.masonry__grid__column}
            >
            {images.map((image, index) => (
            <div key={index} className={styles.image__container}>
                <img src={image.url} alt={`Gallery item ${index}`} className={styles.image} />
                <div className={styles.image__info}>
                    <p className={styles.title}>{image.title}</p>
                    <div className={styles.informations}>
                        <p className={styles.downloads}><BsDownload /> {image.downloads}</p>
                        <p className={styles.comments}><BiCommentDetail />{image.comments}</p>
                        <p className={styles.views}><AiOutlineEye />{image.views}</p>
                    </div>
                </div>
            </div>
            ))}
            </Masonry>
        </div>
    )
}