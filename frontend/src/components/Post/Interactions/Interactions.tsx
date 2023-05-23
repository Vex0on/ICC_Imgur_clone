import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Interactions.module.scss";
import jwt_decode from "jwt-decode";
import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineComment,
} from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { API_URL } from "../../../services/Api/Api";
import { refreshToken } from "../../../utils/tokenUtils";

interface InteractionsProps {
  reactions: number;
  comments: Array<any>;
  imgurUser: Object | null;
  postId: any;
}

interface DecodedToken {
  user_id: number;
}

export const Interactions: React.FC<InteractionsProps> = ({
  reactions,
  comments,
  imgurUser,
  postId,
}) => {
  const [userReaction, setUserReaction] = useState<boolean | null>(null);
  const [reactionCount, setReactionCount] = useState<number>(reactions);

  useEffect(() => {
    const fetchReactionsCount = async () => {
      try {
        const response = await axios.get(
          `${API_URL}reactions/count/0/${postId}`
        );
        setReactionCount(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReactionsCount();
  }, [postId, userReaction]);

  useEffect(() => {
    const checkUserReaction = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token) as DecodedToken;
        const user_id = decodedToken?.user_id;
        try {
          const response = await axios.get(
            `${API_URL}reactions/check/0/${postId}/${user_id}`
          );
          setUserReaction(response.data.reaction);
        } catch (error) {
          console.log(error);
        }
      }
    };

    checkUserReaction();
  }, [postId]);

  const handleReaction = async (reaction: boolean) => {
    let token = localStorage.getItem("token");

    if (!token) {
      await refreshToken(() => handleReaction(reaction), `/post/${postId}`);
      token = localStorage.getItem("token");
    }

    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken;
      const user_id = decodedToken?.user_id;

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (userReaction === reaction) {
          await axios.delete(`${API_URL}reactions/0/${postId}/${user_id}`, {
            headers,
          });
          setUserReaction(null);
        } else if (userReaction !== null) {
          await axios.put(
            `${API_URL}reactions/0/${postId}/${user_id}`,
            { reaction: reaction },
            { headers }
          );
          setUserReaction(reaction);
        } else {
          await axios.post(
            `${API_URL}reactions`,
            {
              imgur_user: user_id,
              reaction: reaction,
              record_id: 0,
              individual_id: postId,
            },
            { headers }
          );
          setUserReaction(reaction);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          await refreshToken(() => handleReaction(reaction), `/post/${postId}`);
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <RxThickArrowUp
          className={`${styles.icon} ${styles.like} ${
            userReaction === true ? styles.likeActive : ""
          }`}
          onClick={() => handleReaction(true)}
        />
        <p className={styles.content}>{reactionCount}</p>
        <RxThickArrowDown
          className={`${styles.icon} ${styles.dislike} ${
            userReaction === false ? styles.dislikeActive : ""
          }`}
          onClick={() => handleReaction(false)}
        />
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
  );
};
