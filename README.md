# スクール日報アプリ

スクール受講中の学習・行動記録を毎日残し、振り返りに活かすための日報アプリ。

## 技術構成

- Next.js (App Router) / TypeScript
- Tailwind CSS
- Supabase (Auth / Database)

## セットアップ

```bash
npm install
cp .env.local.example .env.local
# .env.local に Supabase の URL / anon key を設定
npm run dev
```

Supabase 側で `supabase/migrations/0001_init.sql` を SQL Editor で実行し、テーブルと RLS ポリシーを作成してください。

## ディレクトリ構成

- `src/app` – ルーティング（App Router）
- `src/components` – 共通 UI コンポーネント
- `src/lib/supabase` – Supabase クライアント（ブラウザ / サーバー / Proxy）
- `src/lib/utils` – DAY 計算・日付フォーマットなどのユーティリティ
- `src/types` – Supabase のテーブル型定義
- `supabase/migrations` – DB スキーマ / RLS 定義
