import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from "@/utils/supabase";

const prisma = new PrismaClient();

// GET
export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: "トークン無効" }, { status: 400 });

  // SupabaseのユーザーIDを取得
  const userId = data.user.id;

  try {
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
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    console.log("トークンの取得に失敗:", error);
    return NextResponse.json({ status: "トークン無効" }, { status: 400 });
  }

  // SupabaseのユーザーIDを取得
  const userId = data.user.id;

  try {
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
