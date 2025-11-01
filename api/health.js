import { NextResponse } from 'next/server';
export const config = { runtime: 'edge' };
export default async function handler(req) { return NextResponse.json({ ok: true }); }
