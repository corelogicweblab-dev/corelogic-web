"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      <Stars radius={80} depth={40} count={1200} factor={3} fade speed={0.5} />
      <Sphere ref={meshRef} args={[1.8, 64, 64]}>
        <meshStandardMaterial
          color="#0B1120"
          emissive="#00F5FF"
          emissiveIntensity={0.15}
          wireframe
          transparent
          opacity={0.85}
        />
      </Sphere>
      <Sphere args={[1.85, 32, 32]}>
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>
      {Array.from({ length: 12 }).map((_, i) => {
        const phi = (i / 12) * Math.PI * 2;
        const x = Math.cos(phi) * 2.2;
        const z = Math.sin(phi) * 2.2;
        return (
          <mesh key={i} position={[x, Math.sin(i) * 0.5, z]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#00F5FF" />
          </mesh>
        );
      })}
    </group>
  );
}

export function GlobeScene() {
  return (
    <div className="h-[320px] w-full md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F5FF" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#7C3AED" />
        <Globe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
