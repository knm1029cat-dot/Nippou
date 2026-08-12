import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { LogoutButton } from "@/components/LogoutButton";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold text-gray-800">設定</h1>

      <Card className="flex flex-col gap-3">
        <div>
          <p className="text-xs text-gray-400">スクール名</p>
          <p className="text-base text-gray-800">
            {profile?.school_name || "未設定"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">受講開始日</p>
          <p className="text-base text-gray-800">{profile?.start_date}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">受講期間</p>
          <p className="text-base text-gray-800">
            {profile?.duration_days}日
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">目標</p>
          <p className="whitespace-pre-wrap text-base text-gray-800">
            {profile?.main_goal || "未設定"}
          </p>
        </div>
      </Card>

      <p className="text-sm text-gray-400">
        {user?.email}
      </p>

      <LogoutButton />
    </div>
  );
}
