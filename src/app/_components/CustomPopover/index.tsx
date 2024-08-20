"use client";

import React from "react";
import { Popover, Typography } from "@mui/material";

interface CustomPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  text?: string;
}

export const CustomPopover: React.FC<CustomPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  text,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={onClose}
      disableRestoreFocus
    >
      {text && <Typography sx={{ p: 1 }}>{text}</Typography>}
    </Popover>
  );
};
