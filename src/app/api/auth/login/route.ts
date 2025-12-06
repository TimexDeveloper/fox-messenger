import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    // Demo mode - accept any email/password
    const user = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      email,
      username: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      isOnline: true,
    };

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка входа' },
      { status: 500 }
    );
  }
}
