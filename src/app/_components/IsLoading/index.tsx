import React from "react";
import styles from "./index.module.scss";
import { CircularProgress } from "@mui/material";

export const IsLoading = () => {
  return (
    <div className={styles.container}>
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
    </div>
  );
};
