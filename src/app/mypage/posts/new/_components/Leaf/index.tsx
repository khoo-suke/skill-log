"use client";

import React from "react";
import { RenderLeafProps } from "slate-react";
import { CustomText } from "../../_types/CustomText";

// RenderLeafProps にカスタムプロパティ leaf を追加するための Intersection Types
type LeafProps = RenderLeafProps & {
  leaf: CustomText;
};

// Leaf コンポーネントを定義する
const Leaf: React.FC<LeafProps> = ({ attributes, children, leaf }) => {
  const baseStyles: React.CSSProperties = {
    padding: "0.1em 0",
    margin: "0 1px",
    verticalAlign: "baseline",
    display: "inline-block",
    fontSize: "0.9em",
  };

  // 太字
  if (leaf.bold) {
    return (
      <span {...attributes} style={{ ...baseStyles, fontWeight: "bold" }}>
        {children}
      </span>
    );
  }

  // イタリック
  if (leaf.italic) {
    return (
      <span {...attributes} style={{ ...baseStyles, fontStyle: "italic" }}>
        {children}
      </span>
    );
  }

  // コード
  if (leaf.code) {
    return (
      <span
        {...attributes}
        style={{
          ...baseStyles,
          backgroundColor: "#333",
          color: "#fff",
          display: "block",
          padding: "4px 10px",
        }}
      >
        {children}
      </span>
    );
  }

  // リンク
  if (leaf.link) {
    return (
      <span
        {...attributes}
        style={{
          ...baseStyles,
          color: "#4a76af",
          borderBottom: "1px solid #4a76af",
          paddingBottom: "0.1em",
        }}
      >
        {children}
      </span>
    );
  }

  // 見出し2
  if (leaf.title2) {
    return (
      <h2
        {...attributes}
        style={{
          fontSize: "110%",
          fontWeight: "bold",
        }}
      >
        {children}
      </h2>
    );
  }

  // デフォルトスタイル
  return (
    <span {...attributes} style={baseStyles}>
      {children}
    </span>
  );
};

export default Leaf;
