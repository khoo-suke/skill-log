import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

const prisma = new PrismaClient();

// GET
export const GET = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';

  const { error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ status: 'OK', tags }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}


// POST
export const POST = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';

  const { error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: 'トークン無効' }, { status: 400 });
  
  try {
    const body = await request.json()

    const { name, profileId } = body

    const data = await prisma.tag.create({
      data: {
        name,
        profileId,
      },
    })

    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 })
    }
  }
}