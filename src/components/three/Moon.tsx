"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

/**
 * Photoreal moon: NASA-imagery-based 2K color map doubling as a bump map,
 * with the official badge (cropped from the brand logo file) as a decal.
 * The moon holds its position — no cursor tracking — and simply floats.
 */
export default function Moon({
  radius = 2.4,
  ...props
}: { radius?: number } & React.ComponentProps<"group">) {
  const group = useRef<THREE.Group>(null);

  const [moonMap, badgeMap] = useTexture(
    ["/textures/moon.jpg", "/logo-badge.png"],
    (textures) => {
      (textures as THREE.Texture[]).forEach((t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
      });
    }
  );

  const badge = useMemo(() => {
    const dir = new THREE.Vector3(-0.35, 0.42, 0.84).normalize();
    const position = dir.clone().multiplyScalar(radius * 1.012);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      dir
    );
    return { position, quaternion };
  }, [radius]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    // Weightless float — a slow vertical bob, orientation untouched
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.14;
  });

  return (
    <group ref={group} {...props}>
      <mesh>
        <sphereGeometry args={[radius, 96, 96]} />
        <meshStandardMaterial
          map={moonMap}
          bumpMap={moonMap}
          bumpScale={1.1}
          roughness={1}
          metalness={0}
          envMapIntensity={0.12}
        />
      </mesh>
      <mesh position={badge.position} quaternion={badge.quaternion}>
        <circleGeometry args={[radius * 0.22, 64]} />
        <meshBasicMaterial map={badgeMap} transparent />
      </mesh>
    </group>
  );
}
