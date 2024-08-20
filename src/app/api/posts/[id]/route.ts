import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PostRequestBody } from "@/app/mypage/_types/PostRequestBody";

const prisma = new PrismaClient();

// GET
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
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
    });

    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// DELETE
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const post = await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// PUT
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const body: PostRequestBody = await request.json();
  const { title, content, createdAt, postCategories, postTags } = body;

  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        createdAt,
      },
    });

    // 既存のカテゴリを削除
    await prisma.postCategory.deleteMany({
      where: {
        postId: parseInt(id),
      },
    });

    // 新しいカテゴリを追加
    const postCategoriesData = postCategories.map((category) => ({
      postId: parseInt(id),
      categoryId: category.category.id,
    }));
    await prisma.postCategory.createMany({
      data: postCategoriesData,
    });

    // 既存のタグを削除
    await prisma.postTag.deleteMany({
      where: {
        postId: parseInt(id),
      },
    });

    // 新しいタグを追加
    const postTagsData = postTags.map((tag) => ({
      postId: parseInt(id),
      tagId: tag.tag.id,
    }));
    await prisma.postTag.createMany({
      data: postTagsData,
    });

    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error); // エラーメッセージをログに出力
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
