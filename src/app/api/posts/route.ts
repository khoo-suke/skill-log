import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { supabase } from '@/utils/supabase';

const prisma = new PrismaClient();

// POST
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { title, content, studyTimeId, profileId, imageUrl, postCategories } = body;

    if (!title || !content || !studyTimeId || !profileId || !imageUrl || !postCategories) {
      throw new Error('Missing required fields');
    }

    if (!Array.isArray(postCategories)) {
      throw new Error('カテゴリー登録エラー');
    }

    const data = await prisma.post.create({
      data: {
        title,
        content,
        studyTimeId,
        profileId,
        imageUrl,
        postCategories: {
          create: postCategories.map((category: string) => ({
            category: {
              connectOrCreate: {
                where: { name: category },
                create: { name: category, profileId },
              },
            },
          })),
        },
      },
    })

    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id,
    })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}


//GET
export const GET = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';
  // supabaseに対してtoken
  const { error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  try {
    const posts = await prisma.post.findMany({
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
    })

    return NextResponse.json({ status: 'OK', posts: posts }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}