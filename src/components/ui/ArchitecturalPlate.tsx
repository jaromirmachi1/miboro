interface ArchitecturalPlateProps {
  seed: string;
  className?: string;
}

function hashSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 3;
}

export function ArchitecturalPlate({ seed, className = "" }: ArchitecturalPlateProps) {
  const variant = hashSeed(seed);

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,#1a1a1a_0%,#000000_55%,#000000_100%)]" />

      {variant === 0 && (
        <>
          <div className="absolute bottom-0 left-[8%] h-[78%] w-[38%] bg-black/90" />
          <div className="absolute bottom-0 left-[42%] h-[54%] w-[22%] bg-black" />
          <div className="absolute bottom-[18%] left-[58%] h-[42%] w-[28%] bg-black" />
          <div className="absolute left-[8%] top-[18%] h-px w-[52%] bg-bila/15" />
          <div className="absolute bottom-[32%] left-[8%] h-px w-[38%] bg-oranzova/70" />
        </>
      )}

      {variant === 1 && (
        <>
          <div className="absolute inset-x-[10%] bottom-0 top-[22%] bg-black" />
          <div className="absolute left-[10%] right-[10%] top-[38%] h-px bg-bila/10" />
          <div className="absolute left-[10%] right-[10%] top-[54%] h-px bg-bila/10" />
          <div className="absolute left-[10%] right-[10%] top-[70%] h-px bg-bila/10" />
          <div className="absolute bottom-0 left-[10%] h-[28%] w-[36%] bg-black" />
          <div className="absolute right-[14%] top-[28%] h-1 w-16 bg-oranzova" />
        </>
      )}

      {variant === 2 && (
        <>
          <div className="absolute bottom-0 right-[12%] h-[86%] w-[44%] bg-black" />
          <div className="absolute bottom-[22%] left-[10%] h-[40%] w-[48%] bg-black" />
          <div className="absolute bottom-[22%] left-[10%] h-px w-[70%] bg-oranzova/80" />
          <div className="absolute left-[18%] top-[16%] h-24 w-px bg-bila/20" />
        </>
      )}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
