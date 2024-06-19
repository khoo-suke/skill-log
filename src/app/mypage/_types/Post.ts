import { Category } from './Category';
import { Tag } from './Tag';
import { studyTime } from './StudyTime';
import { Profile } from './Profile';

export type Post = {
  id: number,
  title: string,
  content: string,
  imageUrl: string,
  createdAt: string,
  studyTime:number,
  postCategories: { category: Category }[],
  postTags: { tag: Tag }[],
}