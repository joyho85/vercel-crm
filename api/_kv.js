import { kv } from '@vercel/kv';
const listKey = (t)=> t === 'purchases' ? 'crm:purchases' : 'crm:customers';
export async function addItem(type, obj){ await kv.rpush(listKey(type), JSON.stringify(obj)); }
export async function getItems(type){
  const arr = await kv.lrange(listKey(type), 0, -1) || [];
  return arr.map(s=>{ try{return JSON.parse(s)}catch{return null} }).filter(Boolean);
}
