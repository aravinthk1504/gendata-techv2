"use client";

import { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Edges, Environment } from "@react-three/drei";
import * as THREE from "three";

function GlassBox({ size, position, color = "#56c9ff", opacity = 0.16, speed = 0.1 }) {
  return (
    <RoundedBox args={size} radius={0.025} smoothness={3} position={position}>
      <meshPhysicalMaterial color={color} metalness={0.04} roughness={0.1} transmission={0.88} thickness={0.55} ior={1.46} transparent opacity={opacity} depthWrite={false} side={THREE.DoubleSide} />
      <Edges color={color} threshold={16} scale={1.001} />
    </RoundedBox>
  );
}

function Architecture() {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += Math.min(delta, 0.05) * 0.075;
    group.current.rotation.x = -0.12 + Math.sin(state.clock.elapsedTime * 0.24) * 0.025;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.18}>
      <group ref={group} rotation={[-0.12, -0.42, 0]}>
        <GlassBox size={[3.05, 3.05, 3.05]} position={[0, 0, 0]} opacity={0.07} color="#8bdfff" />
        <GlassBox size={[2.22, 2.22, 2.22]} position={[0, 0, 0]} opacity={0.10} color="#3bbcff" />
        <GlassBox size={[1.4, 1.4, 1.4]} position={[0.05, -0.05, 0.05]} opacity={0.22} color="#24baff" />
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.72,0.72,0.72]} />
          <meshPhysicalMaterial color="#19caff" transmission={0.38} roughness={0.14} metalness={0.15} emissive="#0076ff" emissiveIntensity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <Canvas dpr={[1, 1.65]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} camera={{ position: [5,3.4,6.7], fov: 39 }} style={{ width:"100%",height:"100%" }}>
      <ambientLight intensity={0.65} />
      <hemisphereLight intensity={1.1} color="#c4eaff" groundColor="#071733" />
      <directionalLight position={[2,5,5]} intensity={3.3} color="#8de5ff" />
      <pointLight position={[-3,1,2]} intensity={55} color="#057cfa" distance={10} />
      <pointLight position={[3,-2,-1]} intensity={26} color="#0de2ff" distance={9} />
      <Suspense fallback={null}><Architecture /></Suspense>
    </Canvas>
  );
}

const ClientScene = dynamic(() => Promise.resolve(Scene), { ssr:false });

export default function GlassCube3D() {
  return (
    <div className="relative h-full w-full" aria-label="Slowly rotating illuminated glass architecture in three dimensions" role="img">
      <div className="pointer-events-none absolute inset-[18%] rounded-full bg-[#057cfa]/15 blur-[65px]" />
      <ClientScene />
    </div>
  );
}
