"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { toDateString } from "@/lib/utils/day";

const DURATION_PRESETS = [30, 60, 90, 180] as const;

export function SetupForm() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState("");
  const [startDate, setStartDate] = useState(toDateString(new Date()));
  const [duration, setDuration] = useState<number>(90);
  const [customDuration, setCustomDuration] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [mainGoal, setMainGoal] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const durationDays = isCustom ? Number(customDuration) : duration;

    if (!startDate) {
      setError("受講開始日を入力してください");
      return;
    }
    if (!durationDays || durationDays <= 0) {
      setError("受講期間を正しく入力してください");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      router.replace("/login");
      return;
    }

    const { error: insertError } = await supabase.from("profiles").insert({
      user_id: user.id,
      school_name: schoolName || null,
      start_date: startDate,
      duration_days: durationDays,
      main_goal: mainGoal || null,
    });

    setLoading(false);

    if (insertError) {
      setError("保存に失敗しました。もう一度お試しください");
      return;
    }

    toast.success("設定を保存しました");
    router.replace("/home");
    router.refresh();
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            スクール名（任意）
          </label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="例：AIビジネス実践講座"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-orange-300"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            受講開始日
          </label>
          <input
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-orange-300"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            受講期間
          </label>
          <div className="grid grid-cols-4 gap-2">
            {DURATION_PRESETS.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => {
                  setIsCustom(false);
                  setDuration(d);
                }}
                className={`rounded-xl py-2 text-sm font-medium ${
                  !isCustom && duration === d
                    ? "bg-orange-400 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {d}日
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIsCustom(true)}
            className={`mt-2 w-full rounded-xl py-2 text-sm font-medium ${
              isCustom ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            カスタム
          </button>
          {isCustom && (
            <input
              type="number"
              min={1}
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              placeholder="日数を入力"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-orange-300"
            />
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            目標（任意）
          </label>
          <textarea
            value={mainGoal}
            onChange={(e) => setMainGoal(e.target.value)}
            placeholder="例：3か月以内に副業で初収益を出す"
            rows={3}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-orange-300"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "保存中..." : "はじめる"}
        </Button>
      </form>
    </Card>
  );
}
