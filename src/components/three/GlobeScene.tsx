"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group>
      <Stars radius={60} depth={30} count={800} factor={2} fade speed={0.4} />
      <Sphere ref={meshRef} args={[1.8, 64, 64]}>
        <meshStandardMaterial
          color="#e0f2fe"
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.9}
        />
      </Sphere>
      <Sphere args={[1.85, 32, 32]}>
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.12} />
      </Sphere>
    </group>
  );
}

export function GlobeScene() {
  return (
    <div className="h-[320px] w-full bg-gradient-to-br from-sky-50 to-indigo-50 md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
        <Globe />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
