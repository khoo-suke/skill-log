import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

// GET
export const GET = async ( request: NextRequest,
  { params }: { params: { id: string } },
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
      },
    })

    console.log(post)

    return NextResponse.json({ status: 'OK', post: post }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}
