export function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={radius} stroke="#e2e8f0" strokeWidth="14" fill="none" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#0f766e"
          strokeWidth="14"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-3xl font-semibold">{score}</div>
          <div className="text-xs text-muted-foreground">out of 100</div>
        </div>
      </div>
    </div>
  );
}
