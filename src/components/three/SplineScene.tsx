"use client";

import Spline from "@splinetool/react-spline";

/**
 * Spline-powered hero scene. To use a scene designed in the Spline editor
 * (spline.design): File → Export → Code → copy the .splinecode URL, then set
 * NEXT_PUBLIC_SPLINE_SCENE in .env.local (or pass `scene` directly).
 * Spline scenes handle their own cursor interactivity (mouse-follow events
 * configured in the editor).
 */
export default function SplineScene({ scene }: { scene: string }) {
  return (
    <Spline
      scene={scene}
      className="!absolute !inset-0 [&>canvas]:!h-full [&>canvas]:!w-full"
    />
  );
}
