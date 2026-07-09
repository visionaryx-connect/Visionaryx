"use client";

import Image from "next/image";

/**
 * The official Visionary X orb — served from the brand's own logo file
 * (public/logo-orb.png) so the mark is always pixel-exact.
 */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <Image
      src="/logo-orb.png"
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className="select-none"
    />
  );
}

export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="font-display text-lg font-bold tracking-tight text-ivory">
        Visionary&nbsp;X
      </span>
    </span>
  );
}
