'use client';

import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import { Category } from '@/app/mypage/_types/Category';
import { Tag } from '@/app/mypage/_types/Tag';
import '@/app/globals.scss';
import styles from '@/app/mypage/posts/new/_styles/PostNew.module.scss';
import Wrapper from '@/app/_components/Wrapper';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import Label from '@/app/_components/Label';
import TextEditor from '@/app/mypage/posts/new/_components/TextEditor';
import CustomModal from '@/app/_components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [profileId, setProfileId] = useState('');
  const { token } = useSupabaseSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PostRequestBody[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [year, setYear] = useState(String(new Date(createdAt).getFullYear()));
  const [month, setMonth] = useState(String(new Date(createdAt).getMonth() + 1));
  const [day, setDay] = useState(String(new Date(createdAt).getDay()));
  const [hour, setHour] = useState(String(new Date(createdAt).getHours()))
  const [minutes, setMinutes] = useState(String(new Date(createdAt).getMinutes()));
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isTagModalOpen, setTagModalOpen] = useState(false);
  

  // トークン
  useEffect(() => {
    if (!token) return;
    const fetcher = async () => {
      const response = await fetch('/api/posts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      const { posts } = await response.json();
      setPosts([...posts]);
    };

    fetcher()

  }, [token]);

  // POST 新規記事作成
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!token) return;
    
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        content,
        profileId,
        imageUrl,
        createdAt,
        postCategories: selectCategories,
        postTags: selectTags,
      }),
    });

    router.replace('/mypage');
    alert('記事作成');
  };

  // GET カテゴリー用
  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const response = await fetch(`/api/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();
      setAllCategories(data.categories);
    };

    fetcher();
  }, [token]);

  //POST カテゴリー作成用
  const handleAddCategory: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (!token) return;

    // カテゴリーがnullの場合
    if (!newTag) {
      alert('カテゴリー名を入力してください');
      return;
    }

    const response = await fetch(`/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        name: newCategory,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setAllCategories((categories) => [...categories, data.category]);
      setNewCategory('');
    }
  };

  // SELECT カテゴリー
  const handleChangeCategory = (categoryId: number) => {

    const isSelected = !!selectCategories.find(
      (category) => category.id === categoryId);
  
    if (isSelected) {
      setSelectCategories(
        selectCategories.filter((category) => category.id !== categoryId)
      );
    } else {
      const selectCategory = allCategories.find(
        (category) => category.id === categoryId
      );
      setSelectCategories([...selectCategories, selectCategory!]);
    };
  };

  // GET タグ用
  useEffect(() => {
    if (!token) return
    
    const fetcher = async () => {
      const response = await fetch(`/api/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });
      const data = await response.json();
      console.log(data.tags); // タグデータをログに出力して確認

    // データの構造を確認
    if (Array.isArray(data.tags)) {
      setAllTags(data.tags);
    } else {
      console.error('Unexpected data structure:', data);
    }
  };

    fetcher();
  }, [token]);
  
    // POST タグ作成用
    const handleAddTag: FormEventHandler<HTMLButtonElement> = async (e) => {
      e.preventDefault();
  
      if (!token) return;

      // タグがnullの場合
      if (!newTag) {
        alert('タグ名を入力してください');
        return;
      }
  
      const response = await fetch(`/api/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          name: newTag,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('新規作成タグ名:', data.tag);
        setAllTags((tags) => [...tags, data.tag]);
        setNewTag('');
      };
    };
  
    // SELECT タグ
    const handleChangeTag = (tagId: number) => {

    const isSelected = !!selectTags.find(
      (tag) => tag.id === tagId);
  
    if (isSelected) {
      setSelectTags(
        selectTags.filter((tag) => tag.id !== tagId)
      );
    } else {
      const selectTag = allTags.find(
        (tag) => tag.id === tagId
      );
      setSelectTags([...selectTags, selectTag!]);
    };
  };

  // 現在の時間を取得
  useEffect(() => {
    const now = new Date();
    const defaultDate = now.toISOString();
    setCreatedAt(defaultDate);
    setYear(String(now.getFullYear()));
    setMonth(String(now.getMonth() + 1));
    setDay(String(now.getDate()));
    setHour(String(now.getHours()));
    setMinutes(String(now.getMinutes()));
  }, []);

  // モーダル カテゴリー
  const openCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  // モーダル タグ
  const openTagModal = () => {
    setTagModalOpen(true);
  };

  const closeTagModal = () => {
    setTagModalOpen(false);
  };
  
  
  return (
    <>
      <div className={styles.newPost}>
        <Wrapper size={800}>
          <div className={styles.topLink}>
            <Link href="/mypage">
              <FontAwesomeIcon icon={faAnglesRight} />トップページに戻る
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.title}>
              <Label value='タイトル' />
              <Input
              type={'text'}
              name={'title'}
              id={'title'}
              onChange={setTitle}
              value={title}
            />
            </div>
            <div className={styles.date}>
              <Label value='投稿日' />
              <div className={styles.inner}>
                <div className={styles.year}>
                <Input
                    type={'text'}
                    name={'year'}
                    id={'year'}
                    value={year}
                  />
                  <span>年</span>
                </div>
                <div className={styles.month}>
                  <Input
                    type={'text'}
                    name={'month'}
                    id={'month'}
                    value={month}
                  />
                  <span>月</span>
                </div>
                <div className={styles.day}>
                  <Input
                    type={'text'}
                    name={'day'}
                    id={'day'}
                    value={day}
                  />
                  <span>日</span>
                </div>
                <div className={styles.time}>
                  <Input
                    type={'text'}
                    name={'hour'}
                    id={'hour'}
                    value={hour}
                  />
                  <span>:</span>
                  <Input
                      type={'text'}
                      name={'minutes'}
                    id={'minutes'}
                    value={minutes}
                  />
                </div>
              </div>
            </div>
            <div className={styles.selectArea}>
              <Label value='カテゴリー' />
              <div className={styles.category}>
                <ul>
                  {allCategories && allCategories.map(category => (
                    <li key={category.id}>
                      <button
                        type="button"
                        onClick={() => handleChangeCategory(category.id)}
                        className={selectCategories.find((e) => e.id === category.id) ? styles.selected : ''}
                      >{category.name}</button>
                    </li>
                  ))}
                </ul>
                <div>
                  <button
                    type="button"
                    onClick={openCategoryModal}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </button>
                </div>
                <CustomModal
                  isOpen={isCategoryModalOpen}
                  onRequestClose={closeCategoryModal}
                  className='modal'
                >
                  <div className={styles.modalTop}>
                    <button
                      className={styles.close}
                      onClick={closeCategoryModal}
                    >
                    <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </div>
                  <Label value='新規カテゴリー名'/>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button
                    type='button'
                    color='black'
                    size='small'
                    onClick={handleAddCategory}
                  >
                    追加
                  </Button>
                </CustomModal>
              </div>
            </div>
            <div className={styles.selectArea}>
              <Label value='タグ' />
              <div className={styles.tag}>
                <ul>
                  {allTags && allTags
                    .map(tag => (
                    <li key={tag.id}>
                      <button
                        type="button"
                        onClick={() => handleChangeTag(tag.id)}
                        className={selectTags.find((e) => e.id === tag.id) ? styles.selected : ''}
                      >{tag.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div>
                  <button
                    type="button"
                    onClick={openTagModal}
                  >
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </button>
                </div>
                <CustomModal
                  isOpen={isTagModalOpen}
                  onRequestClose={closeTagModal}
                >
                  <div className={styles.modalTop}>
                    <button
                      className={styles.close}
                      onClick={closeTagModal}
                    >
                    <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </div>
                  <Label value='新規タグ名'/>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                  <Button
                    type='button'
                    color='black'
                    size='small'
                    onClick={handleAddTag}
                  >
                    追加
                  </Button>
                </CustomModal>
              </div>
            </div>
            <div>
              <Label value='内容' />
              <TextEditor />
            </div>
            <div className={styles.btnArea}>
              <Button
                type='submit'
                color='pink'
                size='middle'
              >
                投稿
              </Button>
            </div>
          </form>
        </Wrapper>
      </div>
    </>
  );
};