import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { supabase } from '@/utils/supabase';

const prisma = new PrismaClient();

// POST
export const POST = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';
  
  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    console.log('トークンの取得に失敗:', error);
    return NextResponse.json({ status: 'トークン無効' }, { status: 400 });
  }
  
  // SupabaseのユーザーIDを取得
  const userId = data.user.id;

  // Profileテーブルからユーザー情報を取得
  const profile = await prisma.profile.findUnique({
    where: { supabaseUserId: userId },
  });

  if (!profile) {
    return NextResponse.json({ status: 'プロフィールIDなし' }, { status: 404 });
  }

  const profileId = profile.id;

  try {
    const body = await request.json();

    const { title, content, postCategories, postTags, } = body;

    console.log('登録する値:', body);

    if (!title || !content) {
      throw new Error('必須項目が未入力');
    };

    const data = await prisma.post.create({
      data: {
        title,
        content,
        profileId,
        createdAt: new Date(),
      },
      include: {
        postCategories: true,
        postTags: true
      },
    });

    // カテゴリー 紐づけ
    if (postCategories && Array.isArray(postCategories)) {
      for (const category of postCategories) {
        await prisma.postCategory.create({
          data: {
            categoryId: category.id,
            postId: data.id,
          },
        });
      };
    };

    // タグ 紐づけ
    if (postTags && Array.isArray(postTags)) {
      for (const tag of postTags) {
        await prisma.postTag.create({
          data: {
            tagId: tag.id,
            postId: data.id,
          },
        });
      };
    };

    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id,
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error('リクエスト処理エラー:', error.message);
      return NextResponse.json({ status: error.message }, { status: 400 });
    };
  };
};


//GET
export const GET = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';
  
  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: 'トークン無効' }, { status: 400 });

  // SupabaseのユーザーIDを取得
  const userId = data.user.id;

    // Profileテーブルからユーザー情報を取得
    const profile = await prisma.profile.findUnique({
      where: { supabaseUserId: userId },
    });
  
    if (!profile) {
      return NextResponse.json({ status: 'プロフィールIDなし' }, { status: 404 });
  };
  
  const profileId = profile.id;
  
  try {
    const posts = await prisma.post.findMany({
      where: {
        profileId: profileId,
      },
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        postTags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ status: 'OK', posts: posts }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  };
};