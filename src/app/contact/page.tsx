'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from './_styles/Contact.module.scss';
import Image from 'next/image';
import { ContactForm } from '@/app/contact/_types/ContactForm';
import Wrapper from '../_components/Wrapper';
import Label from '../_components/Label';

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    content: '',
  });

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<ContactForm>({ defaultValues: formData });

  const router = useRouter();

  const onSubmit: SubmitHandler<ContactForm> = (data) => {
    setFormData(data);
      const query = new URLSearchParams(data).toString();
      router.push(`/contact/confirmation?${query}`);
  };

  return (
    <>
    <Wrapper size={800}>
      <div className={styles.capArea}>
        <div className={styles.cap}>
          <span>CONTACT</span>
          <h2>お問い合わせ</h2>
          <p>以下からお問い合せください。</p>
        </div>
        <Image src="/images/contact.png" alt="お問い合わせ" width={470} height={193} />
      </div>
    </Wrapper>
    <Wrapper size={600}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
          <div className={styles.contactBox}>
            <Label
              value='お名前'
              htmlfor='name'
            />
          <div>
            <input id="name" type="text"
              {...register('name', {
                required: 'お名前は必須です。',
                maxLength: {
                  value: 30,
                  message: 'お名前は30文字以内で入力してください。'
                }
              })} />
            {<p className={styles.errorMessage}>{errors.name?.message}</p>}
          </div>
        </div>
          <div className={styles.contactBox}>
          <Label
              value='メールアドレス'
              htmlfor='email'
            />
          <div>
            <input id="email" type="email"
              {...register('email', {
                required: 'メールアドレスは必須です。',
                pattern: {
                  value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                  message: 'メールアドレスの形式が正しくありません。'
                }
              })} />
            {<p className={styles.errorMessage}>{errors.email?.message}</p>}
          </div>
        </div>
          <div className={styles.contactTextArea}>
            <Label
              value='お問い合わせ内容'
              htmlfor='content'
            />
          <div>
            <textarea id="content" cols={30} rows={8}
              {...register('content', {
                required: 'お問い合わせ内容は必須です。',
                maxLength: {
                  value: 500,
                  message: 'お問い合わせ内容は500文字以内で入力してください。'
                }
              })} />
            {<p className={styles.errorMessage}>{errors.content?.message}</p>}
          </div>
        </div>
        <div  className={styles.btnArea}>
          <button type="submit" disabled={isSubmitting}>確認</button>
        </div>
      </form>
    </Wrapper>
    </>
  );
}