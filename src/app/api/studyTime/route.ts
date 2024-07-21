import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { supabase } from '@/utils/supabase';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

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

  try {
    const studyTimes = await prisma.studyTime.findMany({
      where: {
        profile: {
          supabaseUserId: userId,
        },
      },
      select: {
        date: true,
        studyTime: true,
      },
    });

    // 現在の日にち
    const now = new Date();

    // 月初と月末の日にち
    const startMonthDate = startOfMonth(now);
    const endMonthDate = endOfMonth(now);

    // 1か月のデータをフィルタリング
    const oneMonthData = studyTimes.filter((entry) => {
      const entryDate = new Date(entry.date);
      return isWithinInterval(entryDate, { start: startMonthDate, end: endMonthDate });
    });

    // 過去1か月の勉強時間を合計
    const totalStudyTime = oneMonthData.reduce((total, entry) => total + entry.studyTime, 0);

    // 今月の日数で割って平均値を出す
    const currentDayOfMonth = now.getDate();
    const averageTime = totalStudyTime / currentDayOfMonth;
    console.log(averageTime);

    return NextResponse.json({
      status: "OK",
      studyTimes: studyTimes,
      averageStudyTime: averageTime.toFixed(1),
    }, { status: 200 });
    
  } catch (error) {
    if (error instanceof Error) {
      console.error("リクエスト処理エラー:", error.message);
      return NextResponse.json({ status: error.message }, { status: 400 });
    };
  };
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

    const { date, studyTime } = body;

    // ISO-8601形式に変換
    const isDate = new Date(date).toISOString();

    console.log("登録する値:", date, studyTime);

    const data = await prisma.studyTime.create({
      data: {
        studyTime: studyTime,
        date: isDate,
        profile: {
          connect: {
            supabaseUserId: userId,
          },
        },
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
  

  try {
    const { date, studyTime } = await request.json();

    // ISO-8601形式に変換
    const isDate = new Date(date).toISOString();

    console.log("登録する値:", studyTime);

    // レコードの確認
    const recordId = await prisma.studyTime.findFirst({
      where: {
        date: isDate,
        profile: {
          supabaseUserId: userId,
        },
      },
      });

    if (!recordId) {
      return NextResponse.json({ status: "レコードが存在しない" }, { status: 404 });
    };

    const data = await prisma.studyTime.update({
      where: {
        id: recordId.id,
        date: isDate,
      },
      data: {
        studyTime: studyTime,
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
