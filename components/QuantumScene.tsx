/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Box, Cylinder, Plane, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Add missing JSX types for Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      fog: any;
      meshStandardMaterial: any;
      planeGeometry: any;
    }
  }
}

// --- HERO SCENE: FLOATING PAPER & GOLD LEAF ---

const FloatingPage = ({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Gentle floating
      ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.1;
      // Gentle bending/rotation to simulate air resistance
      ref.current.rotation.z = rotation[2] + Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <Plane ref={ref} args={[2, 3, 16, 16]} position={position} rotation={rotation} scale={scale}>
      <meshStandardMaterial 
        color="#F9F8F4" 
        roughness={0.9} 
        side={THREE.DoubleSide}
        emissive="#F9F8F4"
        emissiveIntensity={0.1}
      />
    </Plane>
  );
};

const GoldLeafParticle = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(ref.current) {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.02;
            ref.current.position.y -= 0.002;
            if (ref.current.position.y < -5) ref.current.position.y = 5;
        }
    });

    return (
        <mesh ref={ref} position={position} rotation={[Math.random(), Math.random(), 0]}>
            <planeGeometry args={[0.05, 0.05]} />
            <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
    )
}

export const HeroScene: React.FC = () => {
  // Generate random particles
  const particles = useMemo(() => {
      const p = [];
      for(let i=0; i<50; i++) {
          p.push(<GoldLeafParticle key={i} position={[(Math.random()-0.5)*10, (Math.random()-0.5)*10, (Math.random()-0.5)*5]} />)
      }
      return p;
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} intensity={1} angle={0.5} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C5A059" />
        
        <group>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Main center sheets */}
                <FloatingPage position={[0, 0, 0]} rotation={[0.2, -0.2, 0]} />
                <FloatingPage position={[-1.5, 0.5, -1]} rotation={[0.4, 0.1, -0.1]} scale={0.9} />
                <FloatingPage position={[1.5, -0.5, -1.5]} rotation={[0.1, -0.3, 0.1]} scale={0.8} />
            </Float>
            {particles}
        </group>

        <Environment preset="studio" />
        {/* Fog to blend with background */}
        <fog attach="fog" args={['#F9F8F4', 5, 15]} />
      </Canvas>
    </div>
  );
};

// --- INDUSTRIAL SCENE: BOOK PRESS ---

export const IndustrialMachineScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [4, 3, 4], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#fff" castShadow />
        <pointLight position={[-5, 2, -5]} intensity={1} color="#C5A059" />
        <Environment preset="city" />
        
        <Float rotationIntensity={0.1} floatIntensity={0.2} speed={0.5}>
          <group rotation={[0, -Math.PI / 4, 0]} position={[0, -0.5, 0]}>
            
            {/* Base Plate */}
            <Box args={[3, 0.2, 2]} position={[0, 0, 0]}>
               <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </Box>

            {/* The Book Stack */}
            <Box args={[1.8, 0.6, 1.2]} position={[0, 0.4, 0]}>
                <meshStandardMaterial color="#F9F8F4" roughness={0.8} />
            </Box>
            {/* Book Spine Detail */}
            <Box args={[0.05, 0.6, 1.2]} position={[-0.92, 0.4, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={0.5} roughness={0.4} />
            </Box>

            {/* Top Press Plate */}
            <Box args={[3, 0.2, 2]} position={[0, 0.8, 0]}>
               <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
            </Box>

            {/* Screw Columns */}
            <Cylinder args={[0.1, 0.1, 2.5]} position={[1.2, 1, 0.8]}>
               <meshStandardMaterial color="#888" metalness={1} roughness={0.3} />
            </Cylinder>
            <Cylinder args={[0.1, 0.1, 2.5]} position={[-1.2, 1, 0.8]}>
               <meshStandardMaterial color="#888" metalness={1} roughness={0.3} />
            </Cylinder>
            <Cylinder args={[0.1, 0.1, 2.5]} position={[1.2, 1, -0.8]}>
               <meshStandardMaterial color="#888" metalness={1} roughness={0.3} />
            </Cylinder>
             <Cylinder args={[0.1, 0.1, 2.5]} position={[-1.2, 1, -0.8]}>
               <meshStandardMaterial color="#888" metalness={1} roughness={0.3} />
            </Cylinder>

            {/* Top Wheel */}
            <group position={[0, 2.2, 0]}>
                <Cylinder args={[0.8, 0.8, 0.1, 32]} rotation={[0,0,0]}>
                    <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.3} />
                </Cylinder>
                <Box args={[0.1, 0.3, 0.1]} position={[0, 0.2, 0]}>
                     <meshStandardMaterial color="#111" />
                </Box>
            </group>
            
            {/* Central Screw */}
            <Cylinder args={[0.15, 0.15, 1.4]} position={[0, 1.5, 0]}>
                {/* Screw thread texture simulation via bump map or geometry segments */}
                <meshStandardMaterial color="#666" metalness={0.8} roughness={0.5} />
            </Cylinder>

          </group>
        </Float>
      </Canvas>
    </div>
  );
}