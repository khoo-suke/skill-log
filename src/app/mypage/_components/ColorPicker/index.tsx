"use-client";

import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import styles from "./index.module.scss";

export const ColorPicker: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("#111");
  const [fontColor, setFontColor] = useState<string>("#fff");

  const handleClick = () => {
    setShowPicker(!showPicker);
  };

  const handleClose = () => {
    setShowPicker(false);
  };

  const handleChange = (color: ColorResult) => {
    const newBackgroundColor = color.hex;
    const newFontColor = getContrastingColor(newBackgroundColor);
    setBackgroundColor(newBackgroundColor);
    setFontColor(newFontColor);
  };

  //背景色に応じてフォントの色を変更
  const getContrastingColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#111" : "#fff";
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <div className={styles.bar} onClick={handleClick}>
            <div className={styles.barLeft}>カラー選択</div>
          </div>
        </div>
      </div>
      <div className={styles.pikkerArea}>
        {showPicker && (
          <div className={styles.pikker}>
            <div className={styles.pikkerBack} onClick={handleClose}></div>
            <SketchPicker color={backgroundColor} onChange={handleChange} />
          </div>
        )}
        <div
          className={styles.testText}
          style={{
            backgroundColor: backgroundColor,
            border: `1px solid ${fontColor}`,
            color: fontColor,
          }}
        >
          テスト
        </div>
      </div>
    </>
  );
};
