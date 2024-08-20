import { CustomText } from "./CustomText";

// カスタムエレメント型の定義
export type CustomElement = {
  type: "paragraph";
  children: CustomText[];
};
