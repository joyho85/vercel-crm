import { NextResponse } from 'next/server';
import { getItems } from './_kv';
export const config = { runtime: 'edge' };
export default async function handler(req) {
  const adminKey = req.headers.get('x-admin-key') || '';
  if(!adminKey || adminKey !== process.env.ADMIN_KEY) return new NextResponse('unauthorized', { status: 401 });
  const { searchParams } = new URL(req.url);
  const t = searchParams.get('type') || 'customers';
  const items = await getItems(t === 'purchases' ? 'purchases' : 'customers');
  return NextResponse.json({ items });
}
