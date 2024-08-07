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
    const profile = await prisma.profile.findUnique({
      where: {
        supabaseUserId: userId,
      },
      select: {
        name: true,
        email: true,
        goal: true,
        profileImageKey: true,
      },
    });

    return NextResponse.json(
      { status: "OK", profile: profile },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        { status: "アカウント情報取得失敗" },
        { status: 400 }
      );
  }
};

//PUT
export const PUT = async (request: NextRequest) => {
  try {
    // 認証関数
    const user = await authRequest(request);
    // SupabaseのユーザーIDを取得
    const userId = user.id;
    const { name, goal, profileImageKey } = await request.json();
    const profile = await prisma.profile.update({
      where: {
        supabaseUserId: userId,
      },
      data: {
        name: name ?? "",
        goal: goal ?? "",
        profileImageKey: profileImageKey ?? "",
      },
    });

    return NextResponse.json(
      { status: "OK", plofile: profile },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
