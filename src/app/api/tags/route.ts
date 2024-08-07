import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authRequest } from "@/app/_utils/Auth";

const prisma = new PrismaClient();

// GET
export const GET = async (request: NextRequest) => {
  try {
    // 認証関数
    const user = await authRequest(request);
    // SupabaseのユーザーIDを取得
    const userId = user.id;
    const tags = await prisma.tag.findMany({
      where: {
        profile: {
          supabaseUserId: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ status: "OK", tags }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// POST
export const POST = async (request: NextRequest) => {
  try {
    // 認証関数
    const user = await authRequest(request);
    // SupabaseのユーザーIDを取得
    const userId = user.id;
    const body = await request.json();

    const { name } = body;

    const data = await prisma.tag.create({
      data: {
        name,
        profile: {
          connect: {
            supabaseUserId: userId,
          },
        },
      },
      include: {
        postTags: true,
      },
    });

    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      name: data.name,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
