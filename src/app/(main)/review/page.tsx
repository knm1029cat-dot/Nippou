import { Card } from "@/components/ui/Card";

export default function ReviewPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold text-gray-800">振り返り</h1>
      <Card className="text-center text-gray-400">
        週間振り返り機能は Phase 3 / Phase 4 で実装予定です
      </Card>
    </div>
  );
}
