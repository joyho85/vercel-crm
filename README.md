# Vercel 版智慧顧客管理（KV 儲存）

## 這是什麼
- 前端：`index.html`（顧客表單，含 Email）→ `thanks.html`
- 後台：`admin.html`（登入後看清單、手動新增、CSV 匯出、AI 分析）
- 後端：Vercel Serverless API（在 `/api`），資料存在 **Vercel KV**（Upstash Redis）

## 一步步部署（超新手）
1. 新增一個 GitHub Repo，整包檔案上傳
2. 到 https://vercel.com → Login → Import Project → 選你的 Repo → Deploy
3. 專案 Settings → **Environment Variables** 加：
   - `ADMIN_KEY`：後台密碼（自己決）
4. Project → Storage → **Add** → 選 **KV**（Upstash）→ 按幾下完成後，Vercel 會自動把 `KV_URL`、`KV_REST_API_URL`、`KV_REST_API_TOKEN` 等環境變數塞進專案
5. 回到 Deployments → **Redeploy** 一次

## 驗收
- `https://你的網域/`：表單送出跳 `thanks.html`
- `https://你的網域/admin.html`：輸入 `ADMIN_KEY` 登入
- `https://你的網域/api/health`：回 `{ ok: true }`

## 資料儲存
- 顧客：Redis List key `crm:customers`（每筆 JSON）
- 購買：Redis List key `crm:purchases`

> 未來要升級資料庫，可改 Vercel Postgres / Supabase，API 介面可維持不變。
