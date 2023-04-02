import React, { useEffect, useState } from "react"
import axios from "axios"

import styles from "./Users.module.scss"

import { AiOutlinePlus } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"

import { handleChangeText } from "../../../utils/eventHandlers"
import UserService from "../../../services/UsersServices/UsersService"
import { API_URL } from "../../../services/Api/Api"

export const Users = () => {
  const [data, setData] = useState([])
  const [showFormAdd, setShowFormAdd] = useState(false)
  const [editUser, setEditUser] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    fetchData()
  }, []);

  const handleShowFormAdd = () => {
    setShowFormAdd(!showFormAdd)
  };

  const handleSetEditUser = (user) => {
    setEditUser(user)
  }

  const handleEditUserChange = (event, key) => {
    setEditUser((prevUser) => ({
      ...prevUser,
      [key]: event.target.value,
    }))
  }

  const submitEdit = (e) => {
    e.preventDefault();
    axios
      .put(API_URL + `update/${editUser.id}`, {
        email: editUser.email,
        username: editUser.username,
        phone_number: editUser.phone_number,
        password: "elo",
      })
      .then((response) => {
        setEditUser(null)
        fetchData()
      })
      .catch((err) => {
        console.log("Błąd")
      });
  };

  const fetchData = () => {
    UserService
      .fetchData()
      .then((response) => {
        setData(response)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const submitAdd = (e) => {
    e.preventDefault();
    axios
      .post(API_URL + "register", { username, password })
      .then((response) => {
        setUsername("")
        setPassword("")
        fetchData()
      })
      .catch((err) => {
        console.log("Błąd")
      })
  }

  const deleteUser = (id) => {
    axios
      .delete(API_URL + `delete/${id}`)
      .then((response) => {
        fetchData()
      })
      .catch((err) => {
        console.log("Błąd")
      })
  }

  return (
    <>
      <h1 className={styles.h1}>Użytkownicy Imguur</h1>
      <AiOutlinePlus
        className={styles.icon__plus}
        onClick={handleShowFormAdd}
      />

      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Username</th>
              <th className={styles.th}>Phone number</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          
          <tbody>
            {data.map((user) => (
              <tr className={styles.tr} key={user.id}>
                <td className={styles.td}>{user.id}</td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>{user.username}</td>
                <td className={styles.td}>{user.phone_number}</td>
                <td className={styles.td}>
                  <button onClick={() => deleteUser(user.id)}>Usuń</button>
                  <button onClick={() => handleSetEditUser(user)}>
                    Edytuj
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showFormAdd && (
        <div className={styles.form__overlay} onClick={handleShowFormAdd}>
          <form
            className={styles.form__container}
            onClick={(event) => event.stopPropagation()}
            onSubmit={(e) => submitAdd(e)}
          >
            <RxCross2
              className={styles.form__icon}
              onClick={handleShowFormAdd}
            />

            <label className={styles.form__label} htmlFor="username">
              Email
            </label>

            <input
              className={styles.form__input}
              type="email"
              id="username"
              maxLength={45}
              value={username}
              onChange={(event) => handleChangeText(event, setUsername)}
            />

            <label className={styles.form__label} htmlFor="password">
              Hasło
            </label>

            <input
              className={styles.form__input}
              type="password"
              id="password"
              minLength={8}
              value={password}
              onChange={(event) => handleChangeText(event, setPassword)}
            />

            <button className={styles.form__button} type="submit">
              Dodaj
            </button>
          </form>
        </div>
      )}

      {editUser && (
        <div className={styles.form__overlay}>
          <form
            className={styles.form__container}
            onClick={(event) => event.stopPropagation()}
            onSubmit={(e) => submitEdit(e)}
          >
            <RxCross2
              className={styles.form__icon}
              onClick={() => setEditUser(null)}
            />

            <label className={styles.form__label} htmlFor="email">
              Email
            </label>

            <input
              className={styles.form__input}
              type="email"
              id="email"
              maxLength={45}
              value={editUser.email}
              onChange={(event) => handleEditUserChange(event, "email")}
            />

            <label className={styles.form__label} htmlFor="username">
              Username
            </label>

            <input
              className={styles.form__input}
              type="text"
              id="username"
              maxLength={45}
              value={editUser.username}
              onChange={(event) => handleEditUserChange(event, "username")}
            />

            <label className={styles.form__label} htmlFor="phone_number">
              Phone number
            </label>

            <input
              className={styles.form__input}
              type="text"
              id="phone_number"
              maxLength={45}
              value={editUser.phone_number}
              onChange={(event) => handleEditUserChange(event, "phone_number")}
            />

            <button className={styles.form__button} type="submit">
              Zapisz
            </button>
          </form>
        </div>
      )}
    </>
  );
};
