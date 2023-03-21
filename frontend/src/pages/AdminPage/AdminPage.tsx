import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from './AdminPage.module.scss'

import {Show} from '../../components/Admin/Show/Show'

export const AdminPage = () => {

  return (
    <div className={styles.main} >
      <Show />
    </div>
  );
};
