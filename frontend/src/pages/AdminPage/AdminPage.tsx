import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from './AdminPage.module.scss'

import {Show} from '../../components/Admin/Show/Show'
import { Media } from "../../components/Admin/Media/Media";

export const AdminPage = () => {

  return (
    <div className={styles.main} >
      <Media />
    </div>
  );
};
