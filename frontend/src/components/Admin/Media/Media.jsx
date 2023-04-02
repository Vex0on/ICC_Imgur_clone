import axios from "axios";
import React, { useState, useEffect } from "react";

import styles from "./Media.module.scss";

import { handleChangeText } from "../../../utils/eventHandlers";
import MediaService from "../../../services/MediaServices/MediaService";
import { API_URL } from "../../../services/Api/Api";

import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

export const Media = () => {
  const [data, setData] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [editImage, setEditImage] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowFormAdd = () => {
    setShowFormAdd(!showFormAdd);
  };

  const handleSetEditImage = (user) => {
    setEditImage(user);
  };

  const handleFileSelect = (event) => {
    const files = event.target.files[0];
    setImage(files);
  };

  const handleEditImageChange = (event, key) => {
    setEditImage((prevUser) => ({
      ...prevUser,
      [key]: event.target.value,
    }));
  };

  const fetchData = () => {
    MediaService.fetchImages()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteImage = (id) => {
    axios
      .delete(API_URL + `images/delete/${id}`)
      .then((response) => {
        fetchData();
      })
      .catch((err) => {
        console.log("Błąd");
      });
  };

  const submitAdd = (e) => {
    e.preventDefault();
    const image2 = new FormData();
    image2.append("image", image);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    axios
      .post(API_URL + "images/add", image2, { headers })
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((err) => {
        console.log("Błąd");
      });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    axios
      .put(API_URL + `images/update/${editImage.id}`, {
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
              <th className={styles.th}></th>
            </tr>
          </thead>

          <tbody>
            {data.map((data) => (
              <tr className={styles.tr} key={data.id}>
                <td className={styles.td}>{data.id}</td>
                <td className={styles.td}>{data.name}</td>
                <td className={styles.td}>{data.path}</td>
                <td className={styles.td}><img width="100" src={"http://localhost:8000/" + data.image}/></td>
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
              onChange={(event) => handleChangeText(event, setName)}
            />

            <input
              className={styles.form__file}
              type="file"
              onChange={handleFileSelect}
            />

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
