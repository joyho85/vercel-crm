import { NextResponse } from 'next/server';
import { addItem } from './_kv';
export const config = { runtime: 'edge' };
export default async function handler(req) {
  const adminKey = req.headers.get('x-admin-key') || '';
  if(!adminKey || adminKey !== process.env.ADMIN_KEY) return new NextResponse('unauthorized', { status: 401 });
  if (req.method !== 'POST') return new NextResponse('Method Not Allowed', { status: 405 });
  const body = await req.json().catch(()=>null);
  if(!body || !body.name || !body.time || !body.item || !body.price){
    return new NextResponse('缺少欄位', { status: 400 });
  }
  const item = { ...body, created_at: new Date().toISOString() };
  await addItem('purchases', item);
  return NextResponse.json({ ok: true });
}
