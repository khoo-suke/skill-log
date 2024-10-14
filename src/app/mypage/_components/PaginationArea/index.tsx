"use client";

import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Styles from "./index.module.scss";

interface PaginationAreaProps {
  page: number;
  onPageChange: (page: number) => void;
}

export const PaginationArea: React.FC<PaginationAreaProps> = ({
  page,
  onPageChange,
}) => {
  return (
    <Stack className={Styles.paginationArea} spacing={2}>
      <Pagination
        count={5}
        size="large"
        page={page} //現在のページ番号
        onChange={(e, page) => onPageChange(page)} //変更されたときに走る関数
      />
    </Stack>
  );
};
