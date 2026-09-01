"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type * as THREE from "three";

const REDUCED_MOTION =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Carrot({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);

  useGSAP(() => {
    if (!ref.current || REDUCED_MOTION) return;
    gsap.to(ref.current.rotation, { y: Math.PI * 2, duration: 9, repeat: -1, ease: "none" });
    gsap.to(ref.current.position, {
      y: position[1] + 0.18,
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <group ref={ref} position={position}>
      <mesh position={[0, -0.32, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.22, 0.85, 8]} />
        <meshStandardMaterial color="#e07a3e" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <coneGeometry args={[0.12, 0.38, 6]} />
        <meshStandardMaterial color="#62a63f" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Flower({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);

  useGSAP(() => {
    if (!ref.current || REDUCED_MOTION) return;
    gsap.to(ref.current.rotation, { z: 0.15, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(ref.current.position, {
      y: position[1] + 0.15,
      duration: 2.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 0.4,
    });
  }, []);

  const petals = Array.from({ length: 6 });

  return (
    <group ref={ref} position={position}>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.9, 6]} />
        <meshStandardMaterial color="#3d6b28" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, -0.35, 0]} rotation={[0, 0, 0.6]}>
        <coneGeometry args={[0.06, 0.22, 5]} />
        <meshStandardMaterial color="#4a8a30" roughness={0.7} />
      </mesh>
      {petals.map((_, i) => {
        const angle = (i / petals.length) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.16, 0, Math.sin(angle) * 0.16]}
            rotation={[0, -angle, 0]}
          >
            <sphereGeometry args={[0.13, 8, 6]} />
            <meshStandardMaterial color="#f6e2b0" roughness={0.5} />
          </mesh>
        );
      })}
      <mesh>
        <sphereGeometry args={[0.11, 10, 8]} />
        <meshStandardMaterial color="#e8a530" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Pumpkin({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);

  useGSAP(() => {
    if (!ref.current || REDUCED_MOTION) return;
    gsap.to(ref.current.rotation, { y: -Math.PI * 2, duration: 11, repeat: -1, ease: "none" });
    gsap.to(ref.current.position, {
      y: position[1] + 0.12,
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 0.8,
    });
  }, []);

  return (
    <group ref={ref} position={position}>
      <mesh scale={[1, 0.78, 1]}>
        <sphereGeometry args={[0.32, 12, 10]} />
        <meshStandardMaterial color="#e8a530" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.16, 6]} />
        <meshStandardMaterial color="#4a8a30" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <Carrot position={[-1.5, -0.1, 0]} />
      <Flower position={[0, 0.35, 0]} />
      <Pumpkin position={[1.5, -0.15, 0]} />
    </>
  );
}

export function FarmScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="h-[180px] w-full" aria-hidden="true" />;

  return (
    <div className="h-[180px] w-full" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
