"use client";

import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Sparkles, Environment } from "@react-three/drei";
import Moon from "./Moon";
import OrbitRings from "./OrbitRings";

/**
 * The moon is the hero: it holds a fixed position (no cursor tracking)
 * and simply floats in place. Only layout changes ease it between
 * desktop and mobile positions.
 */
function SceneContent() {
  const moonGroup = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((_, delta) => {
    const d = Math.min(delta * 4, 1);

    // Layout scales with viewport so mobile keeps the full disc in frame
    const wide = viewport.width > 9;
    const moonBase = wide
      ? { x: viewport.width * 0.3, y: 0.7, z: -2.5, s: 1.05 }
      : { x: viewport.width * 0.16, y: 2.8, z: -5, s: 0.5 };

    const moon = moonGroup.current;
    if (moon) {
      moon.position.x += (moonBase.x - moon.position.x) * d;
      moon.position.y += (moonBase.y - moon.position.y) * d;
      moon.position.z += (moonBase.z - moon.position.z) * d;
      moon.scale.setScalar(moon.scale.x + (moonBase.s - moon.scale.x) * d);
    }
  });

  return (
    <group ref={moonGroup}>
      <Moon radius={2.5} />
      <OrbitRings radius={2.5} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
    >
      {/* Sun: hard white key from the badge side, faint grey fill, cool rim */}
      <ambientLight intensity={0.12} />
      <directionalLight position={[7, 5, 5]} intensity={3} color="#ffffff" />
      <directionalLight position={[-6, -2, 3]} intensity={0.25} color="#cccaca" />
      <pointLight position={[-5, 3, -3]} intensity={1.4} color="#ffffff" />

      <Suspense fallback={null}>
        {/* Local studio HDR keeps the lunar surface reflections realistic */}
        <Environment files="/textures/studio.hdr" environmentIntensity={0.35} />
        <Stars radius={60} depth={40} count={2800} factor={4} saturation={0} fade speed={0.6} />
        <Sparkles count={60} scale={14} size={1.6} speed={0.25} opacity={0.5} color="#fbfaf7" />
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
