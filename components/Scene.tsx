"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { FloatingGeometry } from "./FloatingGeometry";
import { ParticleField } from "./ParticleField";

interface SceneProps {
  showParticles?: boolean;
  showGeometry?: boolean;
  className?: string;
}

/**
 * Scene — React Three Fiber canvas wrapper
 * Wraps all 3D content with proper setup:
 * - AdaptiveDpr for performance on different devices
 * - Environment for lighting
 * - Suspense for lazy loading
 */
export default function Scene({
  showParticles = true,
  showGeometry = true,
  className = "",
}: SceneProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      dpr={[1, 2]} // Limit pixel ratio for performance
      style={{ background: "transparent" }}
    >
      {/* Performance helpers */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 5]} intensity={0.5} color="#00ff88" />
      <pointLight position={[-10, -5, -5]} intensity={0.3} color="#00d4ff" />
      <pointLight position={[0, -10, 0]} intensity={0.2} color="#ff2d78" />

      {/* Environment */}
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>

      {/* Scene content */}
      {showParticles && <ParticleField />}
      {showGeometry && <FloatingGeometry />}
    </Canvas>
  );
}
