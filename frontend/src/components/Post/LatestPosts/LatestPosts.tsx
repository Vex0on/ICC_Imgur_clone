import React from "react"

import styles from "./LatestPosts.module.scss"

export const LatestPosts = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Najnowsze posty</h2>

            <div className={styles.container__posts}>
                <div className={styles.posts}>
                    <img className={styles.image} width="100" height="100" src="https://paczaizm.pl/content/wp-content/uploads/fajne-to-moje-zycie-takie-nie-za-ciekawe-typowy-polak-nosacz-malpa.jpg" />
                    <p className={styles.title}>Fajne te życie</p>
                </div>

                <div className={styles.posts}>
                    <img className={styles.image} width="100" height="100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRJ3J9_DYlk-bdg_QPU4BbYW3Z4RSpvjBjlw&usqp=CAU" />
                    <p className={styles.title}>Czerwone róże</p>
                </div>

                <div className={styles.posts}>
                    <img className={styles.image} width="100" height="100" src="https://ae01.alicdn.com/kf/HTB1iG0XNyrpK1RjSZFhq6xSdXXaK/Dude-czarne-fajne-m-skie-Hippie-Lebron-James-raper-elazko-na-haftowane-ubrania-naszywki-na-odzie.jpg_Q90.jpg_.webp" />
                    <p className={styles.title}>Joł joł</p>
                </div>

                <div className={styles.posts}>
                    <img className={styles.image} width="100" height="100" src="https://fajnealpaki.pl/wp-content/uploads/2023/01/alpaki-w-warszawie-00007-1200x800.jpg" />
                    <p className={styles.title}>Lamy</p>
                </div>
            </div>

            <p className={styles.more}>Więcej +</p>
        </div>
      );
}