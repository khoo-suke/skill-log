'use client';

import './_styles/Signup.scss';
import { supabase } from '@/utils/supabase';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    })
    
    if (error) {
      alert('登録失敗')
    } else {
      setEmail('')
      setPassword('')
      alert('確認メール送信')
    }
  }

  return (
    <div className="signup wrapper--600 card">
      <div className="Cap mb-14">
        <span>NEW</span>
        <h2>新規登録</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='signupInner'>
          <label htmlFor="email" className="block mb-2">
            メールアドレス
          </label>
          <input type="email" name="email" id="email"
            placeholder="name@company.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="password" className="block mb-2">
            パスワード
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="btnArea">
          <button type="submit">登録</button>
        </div>
      </form>
    </div>
  )
}