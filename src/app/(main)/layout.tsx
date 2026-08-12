import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BottomNav } from "@/components/ui/BottomNav";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
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

  if (!profile) {
    redirect("/setup");
  }

  return (
    <div className="flex min-h-dvh flex-col bg-orange-50">
      <div className="mx-auto w-full max-w-md flex-1 px-4 pb-4 pt-6">
        {children}
      </div>
      <div className="mx-auto w-full max-w-md">
        <BottomNav />
      </div>
    </div>
  );
}
