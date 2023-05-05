import React, { useState } from "react";
import styles from "../ResetPasswordConfirm/ResetPasswordConfirm.module.scss";
import { BsEnvelope } from "react-icons/bs";

export const ResetPasswordSend = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    fetch("http://localhost:8000/auth/users/reset_password/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 204) {
          alert("Link resetujący hasło został wysłany na maila");
        } else if (response.status === 400) {
          alert("Wystąpił błąd");
        }
      })
      .catch((error) => {
        console.log("Not working");
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.form__label} htmlFor="email">
        Email
      </label>
      <div className={styles.container__icon__input}>
        <BsEnvelope className={styles.form__icon} />
        <input
          className={styles.form__input}
          type="email"
          id="email"
          placeholder="Wpisz email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <button className={styles.form__button} type="submit">
        Resetuj hasło
      </button>
    </form>
  );
};
