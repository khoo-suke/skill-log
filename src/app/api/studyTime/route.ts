import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isWithinInterval } from "date-fns";
import { authRequest } from "@/app/_utils/Auth";

// StudyTimeインターフェースの定義
interface StudyTime {
  date: Date;
  studyTime: number;
}

const prisma = new PrismaClient();

// GET
export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get("year") || "", 10);
    const month = parseInt(url.searchParams.get("month") || "", 10);

    // 認証関数
    const user = await authRequest(request);
    // SupabaseのユーザーIDを取得
    const userId = user.id;
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

    // 月初と月末の日にちを選択された月に基づいて設定
    const startMonthDate = new Date(year, month - 1, 1);
    const endMonthDate = new Date(year, month, 0);

    // 現在の日付を取得
    const now = new Date();

    // 現在の日付までのデータをフィルタリング
    const filteredStudyTimes = studyTimes.filter((entry: StudyTime) => {
      const entryDate = new Date(entry.date);
      return (
        isWithinInterval(entryDate, {
          start: startMonthDate,
          end: endMonthDate,
        }) && entryDate <= now
      );
    });

    // 現在の日付がフィルタリングした月内にあるかどうかを確認
    const isCurrentMonth = now >= startMonthDate && now <= endMonthDate;

    // 平均値を計算する際の分母を決定
    const daysInMonth = endMonthDate.getDate();
    const divisor = isCurrentMonth ? now.getDate() : daysInMonth;

    // 現在の日付までのデータを基に勉強時間を合計
    const totalStudyTime = filteredStudyTimes.reduce(
      (total: number, entry: StudyTime) => total + entry.studyTime,
      0
    );

    // 平均値を出す
    const averageTime = totalStudyTime / divisor;

    return NextResponse.json(
      {
        status: "OK",
        studyTimes: filteredStudyTimes,
        averageStudyTime: averageTime.toFixed(1),
      },
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
  try {
    // 認証関数
    const user = await authRequest(request);
    // SupabaseのユーザーIDを取得
    const userId = user.id;
    const body = await request.json();
    console.log("リクエストボディ:", body);

    const { date, studyTime } = body;

    // 日付のバリデーション
    if (!date || isNaN(new Date(date).getTime())) {
      return NextResponse.json({ status: "無効な日付" }, { status: 400 });
    }

    // studyTimeのバリデーション
    if (typeof studyTime !== "number" || studyTime <= 0) {
      return NextResponse.json({ status: "無効な勉強時間" }, { status: 400 });
    }

    // ISO-8601形式に変換
    const isDate = new Date(date).toISOString();

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
    }
  }
};

// PUT
export const PUT = async (request: NextRequest) => {
  try {
    // 認証関数
    const user = await authRequest(request);
    // SupabaseのユーザーIDを取得
    const userId = user.id;
    const { date, studyTime } = await request.json();

    // ISO-8601形式に変換
    const isDate = new Date(date).toISOString();

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
      return NextResponse.json(
        { status: "レコードが存在しない" },
        { status: 404 }
      );
    }

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
    }
  }
};
