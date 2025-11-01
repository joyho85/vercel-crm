import { NextResponse } from 'next/server';
import { getItems } from './_kv';
export const config = { runtime: 'edge' };
export default async function handler(req) {
  const adminKey = req.headers.get('x-admin-key') || '';
  if(!adminKey || adminKey !== process.env.ADMIN_KEY) return new NextResponse('unauthorized', { status: 401 });
  const customers = await getItems('customers');
  const purchases = await getItems('purchases');
  const totalCustomers = customers.length;
  const totalRevenue = purchases.reduce((sum, p)=> sum + (parseFloat(p.price)||0), 0);
  const byName = {};
  for(const p of purchases){
    const name = p.name || '未填';
    byName[name] = (byName[name]||0) + (parseFloat(p.price)||0);
  }
  const top = Object.entries(byName).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const lines = [
    `總客戶數：${totalCustomers}`,
    `總營收：NT$ ${totalRevenue.toFixed(0)}`,
    `Top 客戶（依金額）：`,
    ...top.map(([n,v],i)=>`  ${i+1}. ${n} / NT$ ${v.toFixed(0)}`)
  ];
  return NextResponse.json({ report: lines.join('\\n') });
}
