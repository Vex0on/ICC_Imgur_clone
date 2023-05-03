import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from './ResetPasswordConfirm.module.scss'
import { BsEnvelope } from 'react-icons/bs'

export const ResetPasswordConfirm = () => {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const { uid, token } = useParams();

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleRePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRePassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== rePassword) {
            alert("Hasła nie są identyczne!");
            return;
        }

        const formData = new FormData();
        formData.append("new_password", password);
        formData.append("re_new_password", rePassword);
        formData.append("uid", uid || '');
        formData.append("token", token || '');

        fetch("http://localhost:8000/auth/users/reset_password_confirm/", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.status === 204) {
                setIsPasswordChanged(true);
            }
          })
          .catch((error) => {
            console.log("Not working");
          });
    };

    return (
        <div>
            {isPasswordChanged ? (
                <div>Hasło zostało zmienione pomyślnie.</div>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label
                        className={styles.form__label}
                        htmlFor='new_password'>
                        Nowe hasło
                    </label>
                    <div className={styles.container__icon__input}>
                        <BsEnvelope className={styles.form__icon}/>
                        <input
                            className={styles.form__input}
                            type='password'
                            id='new_password'
                            placeholder='Wpisz nowe hasło'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <label
                        className={styles.form__label}
                        htmlFor='re_new_password'>
                        Powtórz nowe hasło
                    </label>
                    <div className={styles.container__icon__input}>
                        <BsEnvelope className={styles.form__icon}/>
                        <input
                            className={styles.form__input}
                            type='password'
                            id='re_new_password'
                            placeholder='Powtórz nowe hasło'
                            value={rePassword}
                            onChange={handleRePasswordChange}
                        />
                    </div>

                    <button
                        className={styles.form__button}
                        type='submit'>
                        Resetuj hasło
                    </button>
                </form>
            )}
        </div>
    );
};
