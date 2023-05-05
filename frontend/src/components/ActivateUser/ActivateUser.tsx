import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../ResetPasswordConfirm/ResetPasswordConfirm.module.scss";

export const ActivateUser = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const navigate = useNavigate();

  const handleActivation = () => {
    const formData = new FormData();
    formData.append("uid", uid || "");
    formData.append("token", token || "");

    fetch("http://localhost:8000/auth/users/activation/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 204) {
          setIsActivated(true);
          setMessage("Konto aktywowane");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else if (response.status === 403) {
          setMessage("Konto zostało już aktywowane");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log("Error activating user");
      });
  };

  return (
    <div className={styles.container}>
      {isActivated ? (
        <p>{message}</p>
      ) : (
        <button className={styles.button} onClick={handleActivation}>
          Aktywuj konto
        </button>
      )}
    </div>
  );
};
