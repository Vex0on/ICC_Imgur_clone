import React, { useState, useEffect } from "react";
import styles from "./Comments.module.scss";
import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx";
import axios from "axios";
import { API_URL } from "../../../services/Api/Api";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { refreshToken } from "../../../utils/tokenUtils";

interface ImgurUser {
  username: string;
  reactions: {
    reaction: null;
  };
}

interface CommentData {
  text: string;
  like_count: number;
  dislike_count: number;
  created_time: string;
  updated_time: string;
  imgur_user: ImgurUser;
  subcomments: any[];
  id: number;
}

interface CommentsProps {
  comments: CommentData[];
}

interface CommentReactions {
  comment_id: number;
  count: number;
  subcomments: { subcomment_id: number; count: number }[];
}

interface DecodedToken {
  user_id: number;
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const { id } = useParams<{ id: any }>();
  const [commentReactionsCount, setCommentReactionsCount] = useState<
    CommentReactions[]
  >([]);
  const [updatedComments, setUpdatedComments] =
    useState<CommentData[]>(comments);
  const [UserReactionComment, setUserReactionComment] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    fetchCommentReactionsCount();
  }, []);

  const fetchCommentReactionsCount = async () => {
    try {
      const response = await axios.get(`${API_URL}reactions/count/2/${id}`);
      const commentReactions: CommentReactions[] = response.data.data;
      setCommentReactionsCount(commentReactions);
      console.log(commentReactions);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentReactionCount = (commentId: number): number => {
    const reaction = commentReactionsCount.find(
      (comment) => comment.comment_id === commentId
    );
    return reaction ? reaction.count : 0;
  };

  const getSubcommentReactionCount = (subcommentId: number): number => {
    let count = 0;
    commentReactionsCount.forEach((comment) => {
      comment.subcomments.forEach((subcomment) => {
        if (subcomment.subcomment_id === subcommentId) {
          count += subcomment.count;
        }
      });
    });
    return count;
  };

  const toggleExpandComment = (index: number) => {
    setExpandedComments((prevExpandedComments) =>
      prevExpandedComments.includes(index)
        ? prevExpandedComments.filter(
            (expandedIndex) => expandedIndex !== index
          )
        : [...prevExpandedComments, index]
    );
  };

  const handleAddSubcomment = async (
    commentIndex: number,
    text: string,
    post: number,
    comment: any,
    record_id: number = 0
  ) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken;
      const user_id = decodedToken?.user_id;
      try {
        const response = await axios.post(
          API_URL + "subcomments/add",
          {
            text,
            post,
            comment,
            record_id,
            imgur_user: user_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newSubcomment = response.data;
        const updatedCommentsCopy = [...updatedComments];
        updatedCommentsCopy[commentIndex].subcomments.push(newSubcomment);

        setUpdatedComments(updatedCommentsCopy);
      } catch (commentError) {
        if (
          axios.isAxiosError(commentError) &&
          commentError.response?.status === 401
        ) {
          refreshToken(
            () =>
              handleAddSubcomment(commentIndex, text, post, comment, record_id),
            "/login"
          );
        } else {
          console.log(commentError);
        }
      }
    }
  };

  const handleReaction = async (
    commentId: number,
    reaction: boolean,
    recordId: number
  ) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken;
      const imgur_user = decodedToken?.user_id;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        await axios.post(
          `${API_URL}reactions`,
          {
            imgur_user,
            reaction,
            record_id: recordId,
            individual_id: commentId,
          },
          {
            headers,
          }
        );

        fetchCommentReactionsCount();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          refreshToken(
            () => handleReaction(commentId, reaction, recordId),
            "/login"
          );
        } else if (
          axios.isAxiosError(error) &&
          error.response?.status === 409
        ) {
          if (error.response.data.existing_reaction.reaction == reaction) {
            await axios.delete(
              `${API_URL}reactions/${recordId}/${commentId}/${imgur_user}`,
              {
                headers,
              }
            );
          } else {
            await axios.put(
              `${API_URL}reactions/${recordId}/${commentId}/${imgur_user}`,
              { reaction: reaction },
              { headers }
            );
          }
        }
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <>
      {updatedComments.map((comment, index) => (
        <div className={styles.main} key={index}>
          <div className={styles.comment}>
            <div className={styles.container__informations}>
              <img
                className={styles.informations__avatar}
                width="48"
                height="48"
                src="https://pliki.wiki/blog/wp-content/uploads/2020/10/1601648766.jpeg"
              />
              <p className={styles.informations__name}>
                {comment.imgur_user.username}
              </p>
              <p className={styles.informations__date}>
                {formatDate(comment.created_time)}
              </p>
            </div>

            <p className={styles.content}>{comment.text}</p>

            <div className={styles.container__interactions}>
              <RxThickArrowUp
                className={styles.interactions__icon}
                onClick={() => handleReaction(comment.id, true, 1)}
              />
              <p className={styles.interactions__count}>
                {getCommentReactionCount(comment.id)}
              </p>
              <RxThickArrowDown
                className={styles.interactions__icon}
                onClick={() => handleReaction(comment.id, false, 1)}
              />
              <p
                className={styles.interactions__subcomments}
                onClick={() => toggleExpandComment(index)}
              >
                +{comment.subcomments.length} odpowiedzi
              </p>
            </div>
          </div>

          {expandedComments.includes(index) && (
            <div className={styles.container__subcomments}>
              {comment.subcomments.map((subcomment, subIndex) => (
                <div className={styles.subcomment} key={subIndex}>
                  <div className={styles.container__informations}>
                    <img
                      className={styles.informations__avatar}
                      width="48"
                      height="48"
                      src="https://pliki.wiki/blog/wp-content/uploads/2020/10/1601648766.jpeg"
                    />
                    <p className={styles.informations__name}>
                      {subcomment.imgur_user.username}
                    </p>
                    <p className={styles.informations__date}>
                      {formatDate(subcomment.created_time)}
                    </p>
                  </div>

                  <p className={styles.content}>{subcomment.text}</p>

                  <div className={styles.container__interactions}>
                    <RxThickArrowUp
                      className={styles.interactions__icon}
                      onClick={() => handleReaction(subcomment.id, true, 2)}
                    />
                    <p className={styles.interactions__count}>
                      {getSubcommentReactionCount(subcomment.id)}
                    </p>
                    <RxThickArrowDown
                      className={styles.interactions__icon}
                      onClick={() => handleReaction(subcomment.id, false, 2)}
                    />
                  </div>
                </div>
              ))}

              <form
                className={styles.subcomment__form}
                onSubmit={(e) => {
                  e.preventDefault();
                  const subcommentInput = e.currentTarget.elements.namedItem(
                    "text"
                  ) as HTMLInputElement;
                  handleAddSubcomment(
                    index,
                    subcommentInput.value,
                    id,
                    comment.id
                  );
                  subcommentInput.value = "";
                }}
              >
                <input
                  className={styles.subcomment__input}
                  type="text"
                  name="text"
                  placeholder="Dodaj odpowiedź"
                  required
                />
                <button className={styles.subcomment__submit} type="submit">
                  Dodaj
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
