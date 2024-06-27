import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { supabase } from '@/utils/supabase';

const prisma = new PrismaClient();

// POST
export const POST = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';
  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });
  
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

    const { title, content, studyTimeId, postCategories, postTags, categories, tags } = body;

    console.log('Received request body:', body);

    if (!title || !content) {
      throw new Error('必須項目');
    };

    const data = await prisma.post.create({
      data: {
        title,
        content,
        studyTimeId,
        profileId,
        createdAt: new Date(),
        postCategories: {
          create: postCategories.map((category: string) => ({
            category: {
              connectOrCreate: {
                where: { name: category },
                create: { name: category },
              },
            },
          })),
        },
        postTags: {
          create: postTags.map((tag: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      },
      include: {
        postCategories: true,
        postTags: true
      },
    });

    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id,
        },
      });
    };

    for (const tag of tags) {
      await prisma.postTag.create({
        data: {
          tagId: tag.id,
          postId: data.id,
        },
      });
    };

    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id,
    });

  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  };
};

//GET
export const GET = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';
  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

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