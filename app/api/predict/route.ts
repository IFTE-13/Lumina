import { NextRequest, NextResponse } from 'next/server';
import { fetchPrediction } from '@/lib/backend';
import type { ApiResult, PredictionResponse } from '@/app/types/api';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResult<PredictionResponse>>> {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    // ── Validation ────────────────────────────────────────
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'No file provided', status: 400 },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File exceeds 50 MB limit', status: 413 },
        { status: 413 }
      );
    }

    if (!file.name.endsWith('.exe')) {
      return NextResponse.json(
        { success: false, error: 'Only .exe files are accepted', status: 415 },
        { status: 415 }
      );
    }

    const data = await fetchPrediction(formData);
    return NextResponse.json({ success: true, data, status: 200 });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Prediction failed',
        status: 500,
      },
      { status: 500 }
    );
  }
}