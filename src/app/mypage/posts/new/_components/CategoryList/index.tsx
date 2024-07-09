'use-client';

import React, {
  useState,
  useEffect,
  MouseEventHandler,
} from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Category } from '@/app/mypage/_types/Category';
import styles from '@/app/mypage/posts/new/_components/CategoryList/index.module.scss';
import { Button } from '@/app/_components/Button';
import { Label } from '@/app/_components/Label';
import CustomModal from '@/app/_components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

interface CategoryProps {
  onCategory: (category: string[]) => void;
}

export const CategoryList: React.FC<CategoryProps> = ({ onCategory }) => {
  const { token } = useSupabaseSession();
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  const fetchCategories = async () => {
    
    // GET カテゴリー用
    if (!token) return;
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

    // 初回レンダリング時にカテゴリーを取得
    useEffect(() => {
      fetchCategories();
    }, [token]);

    //POST カテゴリー作成用
    const handleAddCategory: MouseEventHandler<HTMLButtonElement> = async (e) => {
      e.preventDefault();
  
      if (!token) return;
  
      // カテゴリーがnullの場合
      if (!newCategory) {
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
        setAllCategories((categories) => [...categories, data.name]);
        setNewCategory('');
        setCategoryModalOpen(false);
        fetchCategories();
      }
  };
  
  // SELECT カテゴリー
  const handleSelectCategory = (categoryId: number) => {

    const isSelected = !!selectCategories.find(
      (category) => category.id === categoryId
    );
  
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
  
  const handleCategoryChange = (createCategory: string[]) => {
    onCategory(createCategory);
  }

  return (
    <>
      <div className={styles.selectArea}>
        <Label value='カテゴリー' />
        <div className={styles.category}>
          <ul>
            {allCategories && allCategories.map(category => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => handleSelectCategory(category.id)}
                  className={selectCategories.find((e) => e.id === category.id) ? styles.selected : ''}
                >{category.name}</button>
              </li>
            ))}
          </ul>
          <div>
            <button
              type="button"
              onClick={() => setCategoryModalOpen(true)}>
              <FontAwesomeIcon icon={faSquarePlus} />
            </button>
          </div>
          <CustomModal
            isOpen={isCategoryModalOpen}
            onRequestClose={() => setCategoryModalOpen(false)}
            className='modal'
          >
            <div className={styles.modalTop}>
              <button
                className={styles.close}
                onClick={() => setCategoryModalOpen(false)}
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
    </>
  )
}