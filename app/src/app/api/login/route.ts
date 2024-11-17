import { verifyPassword } from '@/lib/auth';
import prisma from '@/lib/db/init';
import { createJWT } from '@/lib/jwt';
import cookie from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json('Invalid email or password', { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json('Invalid email or password', { status: 401 });
    }

    //   Token
    const token = createJWT(user.id, user.email);

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`,
        },
      }
    );
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json(
      { error: 'Email or password invalid' },
      { status: 400 }
    );
  }
}
