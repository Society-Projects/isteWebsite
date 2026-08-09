import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Particle Network
function NetworkNodes({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }

    const lines: number[] = [];
    // Connect points closer than threshold distance
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 4.5) {
          lines.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
          lines.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(lines),
    };
  }, [count]);

  useFrame(({ clock, mouse }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05 + mouse.x * 0.2;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.03 + mouse.y * 0.2;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.getElapsedTime() * 0.05 + mouse.x * 0.2;
      linesRef.current.rotation.x = clock.getElapsedTime() * 0.03 + mouse.y * 0.2;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#06b6d4"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

// 3D Wireframe Tech Core
function TechCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerMeshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x = -t * 0.1;
      outerMeshRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={[0, 0, -1]}>
        {/* Inner glowing icosahedron */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Outer dodecahedron ring */}
        <mesh ref={outerMeshRef}>
          <dodecahedronGeometry args={[3.2, 0]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroCanvas() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
        
        <Stars radius={50} depth={50} count={isMobile ? 1000 : 2500} factor={4} saturation={0} fade speed={1.5} />
        <NetworkNodes count={isMobile ? 40 : 90} />
        <TechCore />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
