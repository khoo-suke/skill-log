import { Category } from './Category';
import { Tag } from './Tag';

export type Post = {
  id: number,
  title: string,
  content: string,
  imageUrl?: string,
  createdAt: string,
  studyTimeId?: number,
  postCategories: { category: Category }[],
  postTags: { tag: Tag }[],
}