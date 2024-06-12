import { Category } from '../Category/Category';
import { Tag } from '../Tag/Tag';

export type Post = {
  id: number,
  title: string,
  content: string,
  imageUrl:string,
  createdAt: string,
  studyTime:number,
  postCategories: { category: Category }[],
  postTags: { tag: Tag }[],
}