import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authRequest } from "@/app/_utils/Auth";

const prisma = new PrismaClient();

// POST
export const POST = async (request: NextRequest) => {
  try {
    // 認証関数
    const user = await authRequest(request);
    // SupabaseのユーザーIDを取得
    const userId = user.id;
    const body = await request.json();

    const { title, content, postCategories, postTags } = body;

    console.log("登録する値:", body);

    if (!title || !content) {
      throw new Error("必須項目が未入力");
    }

    const data = await prisma.post.create({
      data: {
        title,
        content,
        createdAt: new Date(),
        profile: {
          connect: {
            supabaseUserId: userId,
          },
        },
      },
      include: {
        postCategories: true,
        postTags: true,
      },
    });

    // カテゴリー 紐づけ
    if (postCategories && Array.isArray(postCategories)) {
      const postCategoriesData = postCategories.map((category) => ({
        categoryId: category.id,
        postId: data.id,
      }));
      await prisma.postCategory.createMany({
        data: postCategoriesData,
      });
    }

    // タグ 紐づけ
    if (postTags && Array.isArray(postTags)) {
      const postTagsData = postTags.map((tag) => ({
        tagId: tag.id,
        postId: data.id,
      }));
      await prisma.postTag.createMany({
        data: postTagsData,
      });
    }

    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("リクエスト処理エラー:", error.message);
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};

//GET
export const GET = async (
  request: NextRequest
) => {
  
  try {
    // 認証関数
    const user = await authRequest(request);
    // SupabaseのユーザーIDを取得
    const userId = user.id;
    const posts = await prisma.post.findMany({
      where: {
        profile: {
          supabaseUserId: userId,
        },
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
        createdAt: "desc",
      },
    });

    return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
