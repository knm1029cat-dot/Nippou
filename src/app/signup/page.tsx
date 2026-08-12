"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setError("登録に失敗しました。時間をおいて再度お試しください");
      return;
    }

    if (data.session) {
      router.replace("/setup");
      router.refresh();
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-orange-50 px-5">
        <Card className="w-full max-w-sm text-center">
          <p className="text-gray-700">
            確認メールを送信しました。メール内のリンクから登録を完了してください。
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block font-medium text-orange-500"
          >
            ログイン画面へ
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-orange-50 px-5">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          新規登録
        </h1>
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                メールアドレス
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-orange-300"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                パスワード
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-orange-300"
                autoComplete="new-password"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "登録中..." : "登録する"}
            </Button>
          </form>
        </Card>
        <p className="mt-4 text-center text-sm text-gray-500">
          すでにアカウントをお持ちの方は{" "}
          <Link href="/login" className="font-medium text-orange-500">
            ログイン
          </Link>
        </p>
      </div>
    </main>
  );
}
