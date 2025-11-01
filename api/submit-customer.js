import { NextResponse } from 'next/server';
import { addItem } from './_kv';
export const config = { runtime: 'edge' };
export default async function handler(req) {
  if (req.method !== 'POST') return new NextResponse('Method Not Allowed', { status: 405 });
  const body = await req.json().catch(()=>null);
  if(!body || !body.name || !body.birthdate || !body.phone || !body.address || !body.email){
    return new NextResponse('缺少欄位', { status: 400 });
  }
  const item = { ...body, created_at: new Date().toISOString() };
  await addItem('customers', item);
  return NextResponse.json({ ok: true });
}
