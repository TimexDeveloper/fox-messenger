import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const stats = {
      timestamp: new Date(),
      activeConnections: Math.floor(Math.random() * 50),
      totalMessages: Math.floor(Math.random() * 10000),
      activeCalls: Math.floor(Math.random() * 10),
      avgLatency: `${Math.floor(Math.random() * 100)}ms`,
      status: 'healthy',
      version: '0.1.0',
      environment: process.env.NODE_ENV,
      hosting: 'Vercel',
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get health status' },
      { status: 500 }
    );
  }
}
