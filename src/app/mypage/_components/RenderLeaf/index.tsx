"use client";

import React, { useEffect, useRef } from "react";
import { RenderLeafProps } from "slate-react";
import styles from "@/app/mypage/_components/RenderLeaf/index.module.scss";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { EscapeHtml } from "../../_utils/EscapeHtml";
import Link from "next/link";

export const RenderLeaf = (props: RenderLeafProps) => {
  let { attributes, children, leaf } = props;

  // コードハイライト
  const codeRef = useRef(null);

  useEffect(() => {
    if (leaf.code && codeRef.current) {
      try {
        hljs.highlightElement(codeRef.current);
      } catch (error) {
        console.error("Highlight.js error:", error);
      }
    }
  }, [leaf.code, children]);

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.title2) {
    children = <h2>{children}</h2>;
  }

  if (leaf.code) {
    const textContent = leaf.text || "";
    const escapedChildren = EscapeHtml(textContent);

    return (
      <code
        ref={codeRef}
        {...attributes}
        className={`custom-leaf ${styles.code}`}
        dangerouslySetInnerHTML={{ __html: escapedChildren }}
      />
    );
  }

  if (leaf.link) {
    const linkText = children.props?.leaf?.text || "";

    return (
      <Link
        href={linkText}
        {...attributes}
        className={`custom-leaf ${styles.link}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <span
      {...attributes}
      className={`custom-leaf ${leaf.bold ? styles.bold : ""} ${
        leaf.italic ? styles.italic : ""
      } `}
    >
      {children}
    </span>
  );
};
