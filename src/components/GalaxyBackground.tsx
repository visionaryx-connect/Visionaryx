"use client";

/**
 * Fixed galaxy backdrop shared by every section — twinkling stars over
 * soft radial nebulae (no blur filters). Star positions are deterministic
 * so server and client render identically.
 */
const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const STARS = Array.from({ length: 140 }, (_, i) => ({
  left: (seeded(i, 1) * 100).toFixed(2),
  top: (seeded(i, 2) * 100).toFixed(2),
  size: (0.8 + seeded(i, 3) * 1.8).toFixed(2),
  delay: (seeded(i, 4) * 4).toFixed(2),
  duration: (2.5 + seeded(i, 5) * 3.5).toFixed(2),
  opacity: (0.2 + seeded(i, 6) * 0.55).toFixed(2),
}));

export default function GalaxyBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-carbon"
    >
      {/* Soft nebulae via gradients (blur-free) */}
      <div
        className="absolute -left-[15%] top-[-10%] h-[70vh] w-[70vw]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(251,250,247,0.045) 0%, rgba(251,250,247,0.015) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-[20%] bottom-[-15%] h-[80vh] w-[70vw]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(204,202,202,0.04) 0%, rgba(204,202,202,0.012) 45%, transparent 70%)",
        }}
      />

      {/* Twinkling stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ivory"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
