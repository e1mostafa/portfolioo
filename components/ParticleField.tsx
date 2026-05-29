"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;

/**
 * ParticleField
 * GPU-instanced particle system using InstancedMesh.
 * - Mouse-reactive: particles drift away from cursor
 * - Animated with per-particle velocity + damping
 * - Neon color palette matching site theme
 * - Optimized with BufferGeometry + InstancedMesh
 */
export function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport, mouse } = useThree();

  // ——— Initialize per-particle state ———
  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const palette = [
      new THREE.Color("#00ff88"),
      new THREE.Color("#00d4ff"),
      new THREE.Color("#ff2d78"),
      new THREE.Color("#a855f7"),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      velocities[i * 3] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, velocities, colors };
  }, []);

  // ——— Attach color attribute after mount ———
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Tint each instance using a color attribute
    const colorAttr = new THREE.InstancedBufferAttribute(colors, 3);
    mesh.geometry.setAttribute("instanceColor", colorAttr);
    mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
  }, [colors]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // ——— Animation loop ———
  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.elapsedTime;
    const mouseX = mouse.x * viewport.width * 0.5;
    const mouseY = mouse.y * viewport.height * 0.5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x = positions[i * 3];
      let y = positions[i * 3 + 1];
      let z = positions[i * 3 + 2];

      // Mouse repulsion
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        const force = (2 - dist) / 2;
        velocities[i * 3] += (dx / dist) * force * 0.005;
        velocities[i * 3 + 1] += (dy / dist) * force * 0.005;
      }

      // Apply velocity + damping + subtle wave
      velocities[i * 3] *= 0.99;
      velocities[i * 3 + 1] *= 0.99;
      velocities[i * 3 + 2] *= 0.99;

      x += velocities[i * 3] + Math.sin(t * 0.3 + i * 0.01) * 0.001;
      y += velocities[i * 3 + 1] + Math.cos(t * 0.25 + i * 0.015) * 0.001;
      z += velocities[i * 3 + 2];

      // Wrap bounds
      if (x > 10) x = -10;
      if (x < -10) x = 10;
      if (y > 6) y = -6;
      if (y < -6) y = 6;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.015 + Math.sin(t + i) * 0.003);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial vertexColors transparent opacity={0.7} />
    </instancedMesh>
  );
}
