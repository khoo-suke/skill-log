import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET
export const GET = async (
  request: NextRequest,
  { params }: { params: { supabaseUserId: string } },
) => {
  const { supabaseUserId } = params;

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        supabaseUserId,
      },
      select: {
        name: true,
        email: true,
        goal: true,
        profileImageUrl: true,
      },
    });

    console.log('取得したプロフィール:', profile);

    if (!profile) {
      return NextResponse.json({ status: 'Not Found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'OK', profile: profile }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  };
};