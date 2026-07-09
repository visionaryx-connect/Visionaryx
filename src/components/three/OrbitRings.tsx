"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * Elliptical orbit rings built from spline curves (EllipseCurve →
 * CatmullRom → tube), with small satellites travelling along them.
 */
function Ring({
  radius,
  tilt,
  speed,
  satelliteSize = 0.045,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  satelliteSize?: number;
}) {
  const satRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const ellipse = new THREE.EllipseCurve(0, 0, radius, radius * 0.92, 0, Math.PI * 2, false, 0);
    const points = ellipse
      .getPoints(160)
      .map((p) => new THREE.Vector3(p.x, 0, p.y));
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }, [radius]);

  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 200, 0.0075, 8, true),
    [curve]
  );

  useFrame((state) => {
    if (!satRef.current) return;
    const t = (state.clock.elapsedTime * speed) % 1;
    satRef.current.position.copy(curve.getPointAt(t < 0 ? t + 1 : t));
  });

  return (
    <group rotation={tilt}>
      <mesh geometry={tube}>
        <meshBasicMaterial color="#fbfaf7" transparent opacity={0.18} />
      </mesh>
      <mesh ref={satRef}>
        <sphereGeometry args={[satelliteSize, 16, 16]} />
        <meshBasicMaterial color="#fbfaf7" />
      </mesh>
    </group>
  );
}

export default function OrbitRings({ radius }: { radius: number }) {
  return (
    <>
      <Ring radius={radius * 1.45} tilt={[1.35, 0, -0.25]} speed={0.035} />
      <Ring radius={radius * 1.8} tilt={[1.5, 0.2, 0.35]} speed={-0.02} satelliteSize={0.03} />
    </>
  );
}
