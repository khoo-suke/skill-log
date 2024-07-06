import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

//POST
export const POST = async (request: NextRequest) => {
  try {
    // リクエストボディからパスワードを取得
    const { password } = await request.json();

    console.log('受け取ったパスワード:', password); // デバッグ用ログ
    
    // パスワードを更新
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error('Supabaseエラー:', error); // エラーログを追加
      return NextResponse.json({ status: error.message }, { status: 400 });
    }

    return NextResponse.json({
      status: 'OK',
      message: 'パスワード再設定完了',
    });

  } catch (error) {
    console.log('パスワード再設定に失敗');
    return NextResponse.json({ status: 'パスワード再設定に失敗' }, { status: 500 });
  };
};