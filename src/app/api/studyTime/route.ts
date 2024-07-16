import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from "@/utils/supabase";
import { request } from "http";

const prisma = new PrismaClient();

// GET
export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    console.log("トークンの取得に失敗", error);
    return NextResponse.json({ status: "トークン無効" }, { status: 400 });
  }

  // supabaseのユーザーID取得
  const userId = data.user.id;

  // Profileテーブルからユーザー情報を取得
  const profile = await prisma.profile.findUnique({
    where: { supabaseUserId: userId },
  });

  if (!profile) {
    return NextResponse.json({ status: "プロフィールIDなし" }, { status: 404 });
  }

  const profileId = profile.id;

  try {
    const studyTimes = await prisma.studyTime.findMany({
      where: {
        profileId: profileId,
      },
      select: {
        date: true,
        studyTime: true,
      },
    });

    return NextResponse.json(
      { status: "OK", studyTimes: studyTimes },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("リクエスト処理エラー:", error.message);
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
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

  // Profileテーブルからユーザー情報を取得
  const profile = await prisma.profile.findUnique({
    where: { supabaseUserId: userId },
  });

  if (!profile) {
    return NextResponse.json({ status: "プロフィールIDなし" }, { status: 404 });
  }

  try {
    const body = await request.json();

    const { date, studyTime } = body;

    // 日付を日本時間に変換 => ISO-8601形式に変換
    const japanTime = new Date(date).toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });
    const isDate = new Date(japanTime).toISOString();

    console.log("登録する値:", japanTime, studyTime);

    const data = await prisma.studyTime.create({
      data: {
        date: isDate,
        studyTime,
        profileId: profile.id,
      },
    });

    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("リクエスト処理エラー:", error.message);
      return NextResponse.json({ status: error.message }, { status: 400 });
    };
  };
};

// PUT
export const PUT = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: "トークン無効" }, { status: 400 });

  // SupabaseのユーザーIDを取得
  const userId = data.user.id;

  // Profileテーブルからユーザー情報を取得
  const profile = await prisma.profile.findUnique({
    where: { supabaseUserId: userId },
  });

  if (!profile) {
    return NextResponse.json({ status: "プロフィールIDなし" }, { status: 404 });
  };

  try {
    const { date, studyTime } = await request.json();

    // 日付を日本時間に変換 => ISO-8601形式に変換
    const japanTime = new Date(date).toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });
    const isDate = new Date(japanTime).toISOString();

    console.log("登録する値:", japanTime, studyTime);

    // レコードの確認
    const recordId = await prisma.studyTime.findFirst({
      where: {
        date: isDate,
        },
      });

    if (!recordId) {
      return NextResponse.json({ status: "レコードが存在しない" }, { status: 404 });
    };

    const data = await prisma.studyTime.update({
      where: {
        id: recordId.id,
      },
      data: {
        studyTime,
      },
    });

    return NextResponse.json({
      status: "OK",
      message: "更新しました",
      id: data.id,
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error("リクエスト処理エラー:", error.message);
      return NextResponse.json({ status: error.message }, { status: 400 });
    };
  };
};
