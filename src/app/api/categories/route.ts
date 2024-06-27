import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET
export const GET = async (request: NextRequest) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ status: 'OK', categories }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}


// POST
export const POST = async (request: NextRequest, context: any) => {
  try {
    const body = await request.json();

    const { name, profileId } = body;

    const data = await prisma.category.create({
      data: {
        name,
        profileId,
      },
    });

    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 })
    };
  };
};