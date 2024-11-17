import { hashPassword } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        {
          status: 400,
        }
      );
    }

    try {
      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create the user in the database
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return NextResponse.json(
        {
          message: 'User created successfully.',
        },
        {
          status: 201,
        }
      );
    } catch {
      return NextResponse.json(
        { error: 'Something went wrong.' },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      { error: 'Method not allowed.' },
      {
        status: 405,
      }
    );
  }
}
