import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { calcDayProgress, formatDateJa } from "@/lib/utils/day";

function getGreeting(hour: number): string {
  if (hour < 5) return "こんばんは";
  if (hour < 11) return "おはようございます";
  if (hour < 18) return "こんにちは";
  return "こんばんは";
}

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  const now = new Date();
  const { day, totalDays, percent } = calcDayProgress(
    profile!.start_date,
    profile!.duration_days,
    now
  );

  return (
    <div className="flex flex-col gap-5">
      <p className="text-lg font-medium text-gray-700">
        {getGreeting(now.getHours())}
      </p>

      <Card>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-gray-800">
            DAY {day} / {totalDays}
          </span>
          <span className="text-sm font-medium text-orange-500">
            {percent}%
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar percent={percent} />
        </div>
        {profile?.school_name && (
          <p className="mt-3 text-sm text-gray-400">{profile.school_name}</p>
        )}
      </Card>

      <p className="text-center text-sm text-gray-500">
        {formatDateJa(now)}
      </p>

      <Link href="/reports">
        <Card className="flex flex-col items-center justify-center gap-1 bg-orange-400 py-8 text-white shadow-md active:bg-orange-500">
          <span className="text-lg font-semibold">今日の日報を書く</span>
        </Card>
      </Link>
    </div>
  );
}
