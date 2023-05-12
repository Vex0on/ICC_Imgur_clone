import React, { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../../services/Api/Api"
import styles from './User.module.scss'

export const User = ({ userId }) => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  useEffect(() => {
    if (userId) {
      axios.get(`${API_URL}users/${userId}`)
        .then(response => {
          setUser(response.data)
          setUsername(response.data.username)
          setEmail(response.data.email)
          setPhoneNumber(response.data.phone_number)
          setFirstname(response.data.first_name)
          setLastname(response.data.last_name)
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
    }
  }, [userId])

  const onSubmit = (event) => {
    event.preventDefault()
    let phone_number = phoneNumber
    let first_name = firstname
    let last_name = lastname

    const data = { username, email, phone_number, first_name, last_name } 

    axios.put(`${API_URL}update/${userId}`, data)
      .then(response => {
        setUser(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  }

  return (
    <>
      {user && (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.form__label}>Nazwa użytkownika</label>
            <input className={styles.form__input} value={username} onChange={e => setUsername(e.target.value)} />
            
            <label className={styles.form__label}>Email</label>
            <input className={styles.form__input} value={email} onChange={e => setEmail(e.target.value)} />

            <label className={styles.form__label}>Numer Telefonu</label>
            <input className={styles.form__input} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

            <label className={styles.form__label}>Imię</label>
            <input className={styles.form__input} value={firstname} onChange={e => setFirstname(e.target.value)} />
             
            <label className={styles.form__label}>Nazwisko</label>
            <input className={styles.form__input} value={lastname} onChange={e => setLastname(e.target.value)} />
            
            <div className={styles.container__submit}>
              <button className={styles.form__submit} type="submit">Edytuj</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
