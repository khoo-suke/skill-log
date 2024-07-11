import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { supabase } from '@/utils/supabase';

const prisma = new PrismaClient();

// GET
export const GET = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';
  
  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    console.log('トークンの取得に失敗:', error);
    return NextResponse.json({ status: 'トークン無効' }, { status: 400 });
  }

  // SupabaseのユーザーIDを取得
  const userId = data.user.id;
  console.log(userId)

  // Profileテーブルからユーザー情報を取得
  try {
    const profile = await prisma.profile.findUnique({
      where: {
          supabaseUserId: userId,
      },
      select: {
        name: true,
        email: true,
        goal: true,
        profileImageUrl: true,
      },
    });

    return NextResponse.json({ status: 'OK', profile: profile }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: 'アカウント情報取得失敗' }, { status: 400 });
  };
};

//PUT
export const PUT = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';
  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: 'トークン無効' }, { status: 400 });

  // SupabaseのユーザーIDを取得
  const userId = data.user.id;

  const { name, goal } = await request.json();

  try {
    const profile = await prisma.profile.update({
      where: {
        supabaseUserId: userId,
      },
      data: {
        name,
        goal,
      },
    });

    return NextResponse.json({ status: 'OK', plofile: profile }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  };
};