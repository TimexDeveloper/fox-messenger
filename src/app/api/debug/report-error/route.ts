import { NextRequest, NextResponse } from 'next/server';
import { ErrorTracker } from '@/lib/debug';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log error for monitoring
    console.error('[Vercel Error Report]', {
      message: body.message,
      stack: body.stack,
      userAgent: body.userAgent,
      timestamp: body.timestamp,
    });

    // Track error locally
    ErrorTracker.trackError(new Error(body.message), 'Client Error');

    return NextResponse.json(
      { success: true, message: 'Error reported' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Error Report Endpoint] Failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to report error' },
      { status: 500 }
    );
  }
}
