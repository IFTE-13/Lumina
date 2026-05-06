import { NextResponse } from 'next/server';
import { fetchHealth } from '@/lib/backend';
import type { ApiResult, HealthResponse } from '@/app/types/api';

export async function GET(): Promise<NextResponse<ApiResult<HealthResponse>>> {
  try {
    const data = await fetchHealth();
    return NextResponse.json({ success: true, data, status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: { status: 'unhealthy', model_ready: false },
        error: error instanceof Error ? error.message : 'Health check failed',
        status: 503,
      },
      { status: 200 }
    );
  }
}