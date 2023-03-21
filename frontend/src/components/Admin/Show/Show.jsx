import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from './Show.module.scss'

export const Show = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  return (
    <>
      <h1 className={styles.h1}>Użytkownicy Imguur</h1>
      <div className={styles.container} >
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th} >ID</th>
              <th className={styles.th} >Email</th>
              <th className={styles.th} >Username</th>
              <th className={styles.th} >Phone number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr className={styles.tr} key={user.id}>
                <td className={styles.td} >{user.id}</td>
                <td className={styles.td} >{user.email}</td>
                <td className={styles.td} >{user.username}</td>
                <td className={styles.td} >{user.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}