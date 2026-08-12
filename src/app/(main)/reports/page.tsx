import { Card } from "@/components/ui/Card";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold text-gray-800">日報</h1>
      <Card className="text-center text-gray-400">
        日報の作成・一覧機能は Phase 2 で実装予定です
      </Card>
    </div>
  );
}
