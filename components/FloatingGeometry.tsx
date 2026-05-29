"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * FloatingGeometry
 * Collection of wireframe geometric shapes floating in 3D space.
 * - Icosahedron (main hero shape)
 * - Torus knot
 * - Octahedron
 * Each has subtle rotation + bob animation.
 * Uses a custom emissive material for neon glow.
 */
export function FloatingGeometry() {
  return (
    <group>
      <FloatingShape
        geometry={<icosahedronGeometry args={[1, 1]} />}
        position={[3, 0.5, -2]}
        color="#00ff88"
        speed={0.3}
        amplitude={0.4}
        rotationSpeed={[0.002, 0.004, 0.001]}
      />
      <FloatingShape
        geometry={<torusKnotGeometry args={[0.6, 0.18, 100, 16]} />}
        position={[-3.5, -0.5, -3]}
        color="#00d4ff"
        speed={0.25}
        amplitude={0.3}
        rotationSpeed={[0.003, 0.002, 0.004]}
        phase={Math.PI}
      />
      <FloatingShape
        geometry={<octahedronGeometry args={[0.9]} />}
        position={[0, 2.5, -4]}
        color="#a855f7"
        speed={0.2}
        amplitude={0.5}
        rotationSpeed={[0.004, 0.001, 0.003]}
        phase={Math.PI / 2}
      />
      <FloatingShape
        geometry={<tetrahedronGeometry args={[0.7]} />}
        position={[-2, -2, -2]}
        color="#ff2d78"
        speed={0.35}
        amplitude={0.25}
        rotationSpeed={[0.002, 0.005, 0.002]}
        phase={Math.PI * 1.5}
      />
    </group>
  );
}

interface FloatingShapeProps {
  geometry: React.ReactElement;
  position: [number, number, number];
  color: string;
  speed: number;
  amplitude: number;
  rotationSpeed: [number, number, number];
  phase?: number;
}

function FloatingShape({
  geometry,
  position,
  color,
  speed,
  amplitude,
  rotationSpeed,
  phase = 0,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.15,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      }),
    [color]
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime;
    mesh.position.y = position[1] + Math.sin(t * speed + phase) * amplitude;
    mesh.rotation.x += rotationSpeed[0];
    mesh.rotation.y += rotationSpeed[1];
    mesh.rotation.z += rotationSpeed[2];
    // Pulse opacity
    mat.opacity = 0.3 + Math.sin(t * 0.8 + phase) * 0.15;
    mat.emissiveIntensity = 0.1 + Math.sin(t * 1.2 + phase) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={position} material={mat}>
      {geometry}
    </mesh>
  );
}
