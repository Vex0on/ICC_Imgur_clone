import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from './AdminPage.module.scss'

interface UserData {
  id: number;
  email: string;
  username: string;
  phone_number: string;
}

export const AdminPage = () => {
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
      <table> 
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};
