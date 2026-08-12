export function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-orange-100">
      <div
        className="h-full rounded-full bg-orange-400 transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
