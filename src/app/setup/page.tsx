import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SetupForm } from "./SetupForm";

export default async function SetupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profile) {
    redirect("/home");
  }

  return (
    <main className="min-h-dvh bg-orange-50 px-5 py-10">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="mb-1 text-center text-2xl font-bold text-gray-800">
          スクール設定
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          最初に受講内容を教えてください
        </p>
        <SetupForm />
      </div>
    </main>
  );
}
