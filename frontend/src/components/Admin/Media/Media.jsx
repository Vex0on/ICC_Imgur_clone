import axios from "axios";
import React, { useState } from "react";
import styles from "./Media.module.scss";
import {
  handleNameChange,
} from "../../../utils/eventHandlers";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

export const Media = () => {
  // const images = ['media-01.jpg', 'media-02.jpg', 'media-03.jpg', 'media-04.jpg'];

  const [data, setData] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [editImage, setEditImage] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState([]);

  const handleShowFormAdd = () => {
    setShowFormAdd(!showFormAdd);
  };

  const handleSetEditImage = (user) => {
    setEditImage(user);
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setImage(files);
  };

  const handleEditImageChange = (event, key) => {
    setEditImage((prevUser) => ({
      ...prevUser,
      [key]: event.target.value,
    }));
  };

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/api/images")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteImage = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_image/${id}`)
      .then((response) => {
        fetchData();
      })
      .catch((err) => {
        console.log("Błąd");
      });
  };

  const submitAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/add_image", { name, image })
      .then((response) => {
        fetchData();
      })
      .catch((err) => {
        console.log("Błąd");
      });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/update_image/${editImage.id}`, {
        name: editImage.name,
        file: editImage.file,
      })
      .then((response) => {
        setEditImage(null);
        fetchData();
      })
      .catch((err) => {
        console.log("Błąd");
      });
  };

  return (
    <>
      <h1 className={styles.h1}>Obrazy Imguur</h1>
      <AiOutlinePlus
        className={styles.icon__plus}
        onClick={handleShowFormAdd}
      />

      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Nazwa</th>
              <th className={styles.th}>Obraz</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr className={styles.tr} key={data.id}>
                <td className={styles.td}>{data.id}</td>
                <td className={styles.td}>{data.name}</td>
                <td className={styles.td}>{data.path}</td>
                <td className={styles.td}>
                  <img src={`/media/${data.path}`} alt="" />
                </td>
                <td className={styles.td}>
                  <button onClick={() => deleteImage(data.id)}>Usuń</button>
                  <button onClick={() => handleSetEditImage(data)}>
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
            <label className={styles.form__label} htmlFor="name">
              Nazwa
            </label>

            <input
              className={styles.form__input}
              type="text"
              id="name"
              maxLength={45}
              value={name}
              onChange={(event) => handleNameChange(event, setName)}
            />

            <input className={styles.form__file} type="file" onChange={handleFileSelect} />

            <button className={styles.form__button} type="submit">
              Dodaj
            </button>
          </form>
        </div>
      )}

      {editImage && (
        <div className={styles.form__overlay}>
          <form
            className={styles.form__container}
            onClick={(event) => event.stopPropagation()}
            onSubmit={(e) => submitEdit(e)}
          >
            <RxCross2
              className={styles.form__icon}
              onClick={() => setEditImage(null)}
            />
            <label className={styles.form__label} htmlFor="name">
              Nazwa
            </label>
            <input
              className={styles.form__input}
              type="text"
              id="name"
              maxLength={45}
              value={editImage.name}
              onChange={(event) => handleEditImageChange(event, "name")}
            />
            <label className={styles.form__label} htmlFor="file">
              Obraz
            </label>
            <input
              type="file"
              id="file"
              onChange={(event) => handleEditImageChange(event, "file")}
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
