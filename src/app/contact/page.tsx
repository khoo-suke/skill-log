'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import './_styles/Contact.scss';
import Image from 'next/image';
import { ContactForm } from './_components/ContactForm';

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
    <div className="wrapper--800">
      <div className="capArea">
        <div className="Cap">
          <span>CONTACT</span>
          <h2 className="mb-5">お問い合わせ</h2>
          <p>以下からお問い合せください。</p>
        </div>
        <Image src="/images/contact.png" alt="お問い合わせ" width={470} height={193} />
      </div>
    </div>
    <div className="wrapper--600 mb-[100px]">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="contactBox mb-5">
          <label htmlFor="name">お名前</label>
          <div className="w-full">
            <input id="name" type="text"
              {...register('name', {
                required: 'お名前は必須です。',
                maxLength: {
                  value: 30,
                  message: 'お名前は30文字以内で入力してください。'
                }
              })} />
            {<p className="errorMessage">{errors.name?.message}</p>}
          </div>
        </div>
        <div className="contactBox mb-5">
          <label htmlFor="email">メールアドレス</label>
          <div className="w-full">
            <input id="email" type="email"
              {...register('email', {
                required: 'メールアドレスは必須です。',
                pattern: {
                  value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                  message: 'メールアドレスの形式が正しくありません。'
                }
              })} />
            {<p className="errorMessage">{errors.email?.message}</p>}
          </div>
        </div>
        <div className="contactBox mb-5">
          <label htmlFor="content">お問い合わせ内容</label>
          <div className="w-full">
            <textarea id="content" cols={30} rows={8}
              {...register('content', {
                required: 'お問い合わせ内容は必須です。',
                maxLength: {
                  value: 500,
                  message: 'お問い合わせ内容は500文字以内で入力してください。'
                }
              })} />
            {<p className="errorMessage">{errors.content?.message}</p>}
          </div>
        </div>
        <div className="btnArea">
          <button type="submit" disabled={isSubmitting}>確認</button>
        </div>
      </form>
      </div>
    </>
  );
}