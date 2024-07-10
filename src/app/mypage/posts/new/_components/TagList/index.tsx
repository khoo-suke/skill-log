'use client';

import {
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Tag } from '@/app/mypage/_types/Tag';
import styles from '@/app/mypage/posts/new/_components/TagList/index.module.scss';
import { Label } from '@/app/_components/Label';
import CustomModal from '@/app/_components/Modal';
import { Button } from '@/app/_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

interface TagProps {
  selectTags: Tag[];
  setSelectTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const TagList: React.FC<TagProps> = ({ selectTags, setSelectTags }) => {
  const { token } = useSupabaseSession();
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isTagModalOpen, setTagModalOpen] = useState(false);

  const fetchTags = async () => {

    // GET タグ用
    if (!token) return;
    const response = await fetch('/api/tags', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });
    const data = await response.json();
    setAllTags(data.tags);
  };
  
  // 初回レンダリング時にタグを取得
  useEffect(() => {
    fetchTags();
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
      setAllTags((tags) => [...tags, data.name]);
      setNewTag('');
      setTagModalOpen(false);
      fetchTags();
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
  
  return (
    <>
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
            onClick={() => setTagModalOpen(true)}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
        </div>
      </div>
    </div>
    <CustomModal
      isOpen={isTagModalOpen}
      onRequestClose={() => setTagModalOpen(false)}
      className='modal'
    >
      <div className={styles.modalTop}>
        <button
          className={styles.close}
          onClick={() => setTagModalOpen(false)}
        >
        <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
      <Label value='新規カテゴリー名'/>
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
    </>
  );
};