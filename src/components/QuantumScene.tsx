
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Box, Cylinder, Plane, useTexture, Grid, Center, OrbitControls, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';

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

type GoldLeafParticleProps = {
    position: [number, number, number];
};

const GoldLeafParticle: React.FC<GoldLeafParticleProps> = ({ position }) => {
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

// --- INDUSTRIAL SCENE: BOOK PRESS (Legacy) ---
export const IndustrialMachineScene: React.FC = () => {
  return null; // Component deprecated/removed for performance
}

// --- CONTACT SCENE: ARCHITECTURAL WHITE MODEL ---

// Industrial Silo/Tank
const IndustrialTank = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh castShadow receiveShadow position={[0, 3, 0]}>
            <cylinderGeometry args={[2.5, 2.5, 6, 32]} />
            <meshStandardMaterial color="#eeeeee" roughness={0.4} />
        </mesh>
    </group>
);

// Low Poly Tree
const LowPolyTree = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => (
     <group position={position} scale={scale}>
        <mesh position={[0, 1, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.4, 2, 8]} />
             <meshStandardMaterial color="#8d6e63" />
        </mesh>
        <mesh position={[0, 3.5, 0]} castShadow>
            <dodecahedronGeometry args={[2]} />
            <meshStandardMaterial color="#a5d6a7" roughness={1} />
        </mesh>
     </group>
);

// Surrounding Industrial Block
const ContextBuilding = ({ position, args, rotation = [0,0,0] }: { position: [number, number, number], args: [number, number, number], rotation?: [number, number, number] }) => (
    <mesh position={position} rotation={rotation as any} castShadow receiveShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
    </mesh>
);

const LogisticsLayer = () => {
    return (
        <group>
            {/* --- LOGISTICS YARD REMOVED (Trucks & Pallets deleted) --- */}
            
            {/* Industrial Tanks (Left side context) */}
            <IndustrialTank position={[-25, 0, -15]} />
            <IndustrialTank position={[-25, 0, -8]} />

            {/* Greenery / Landscaping */}
            <LowPolyTree position={[-30, 0, 10]} scale={1.2} />
            <LowPolyTree position={[-35, 0, 15]} />
            <LowPolyTree position={[-28, 0, 5]} />
            <LowPolyTree position={[30, 0, 30]} scale={0.8} />
            <LowPolyTree position={[35, 0, 25]} />

            {/* --- OUTER CONTEXT: Surrounding Industrial Zone --- */}
            
            {/* North Block - Huge Warehouse */}
            <ContextBuilding position={[0, 6, -50]} args={[100, 12, 40]} />
            
            {/* East Block - Neighboring Factory */}
            <ContextBuilding position={[60, 8, 0]} args={[40, 16, 80]} />
            
            {/* West Block - Office Complex */}
            <ContextBuilding position={[-60, 5, -10]} args={[40, 10, 60]} />
            
            {/* South Boundary */}
            <ContextBuilding position={[10, 4, 60]} args={[80, 8, 20]} />

        </group>
    )
}

export const ContactScene: React.FC = () => {
    
    // Custom SVG Path Parser to create the building shape
    const hqShape = useMemo(() => {
        const shape = new THREE.Shape();
        
        // Visual reconstruction of the points based on the 762x818 coordinate space:
        shape.moveTo(0, 0); // Top Left
        shape.lineTo(51, 0);
        shape.lineTo(51, 146);
        shape.lineTo(119, 147); // Small jut out
        shape.lineTo(117, 223);
        shape.lineTo(157, 227);
        shape.lineTo(160, 230);
        shape.lineTo(167, 375);
        shape.lineTo(220, 375);
        shape.lineTo(227, 504);
        shape.lineTo(230, 507);
        shape.lineTo(297, 506);
        shape.lineTo(465, 505); // Long straight section
        // The curve approximation
        shape.lineTo(516, 458);
        shape.lineTo(554, 450);
        shape.lineTo(621, 376);
        shape.lineTo(693, 244);
        shape.lineTo(737, 145); // Top Right Tip
        shape.lineTo(760, 152); 
        shape.lineTo(736, 257);
        
        // The large sweeping curve back to bottom left
        // We approximate this with a few quadratic curves for the smooth "fan" look
        shape.quadraticCurveTo(650, 400, 455, 600);
        shape.quadraticCurveTo(226, 818, 0, 818);
        
        shape.lineTo(0, 0); // Close loop

        return shape;
    }, []);

    const extrudeSettings = useMemo(() => ({
        depth: 150, // Significantly increased depth for better visibility
        bevelEnabled: false,
    }), []);

    return (
        <div className="w-full h-full absolute inset-0 bg-[#e5e5e5]">
            <Canvas shadows camera={{ position: [0, 100, 80], fov: 35 }}>
                
                {/* Architectural Lighting - Clean & Bright */}
                <ambientLight intensity={0.7} />
                <directionalLight 
                    position={[50, 100, 50]} 
                    intensity={1.5} 
                    castShadow 
                    shadow-mapSize={[2048, 2048]} 
                    shadow-bias={-0.0005}
                />
                
                <group position={[0, 0, 0]}>
                    <Center top>
                         {/* THE HQ - Main Building from SVG */}
                         {/* Scaled and Mirrored along X axis */}
                         <group scale={[-0.05, 0.05, 0.05]}> 
                            <mesh rotation={[-Math.PI/2, 0, 0]} castShadow receiveShadow>
                                <extrudeGeometry args={[hqShape, extrudeSettings]} />
                                <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.1} side={THREE.DoubleSide} />
                            </mesh>
                            
                            {/* Roof Detail - Wireframe overlay */}
                             <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 150.1, 0]}>
                                <extrudeGeometry args={[hqShape, { depth: 0, bevelEnabled: false }]} />
                                <meshBasicMaterial color="#cccccc" wireframe side={THREE.DoubleSide} />
                            </mesh>
                         </group>
                    </Center>
                    
                    {/* Surrounding Logistics Context */}
                    <LogisticsLayer />

                     {/* Ground Plane - Slightly Darker for contrast */}
                     <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                         <planeGeometry args={[800, 800]} />
                         <meshStandardMaterial color="#d4d4d4" roughness={1} />
                     </mesh>
                </group>

                {/* Controls - Fixed View (Zoom Disabled) - ANGLED VIEW DEFAULT */}
                <OrbitControls 
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2.2} 
                    enableZoom={false}
                />
                
                <Environment preset="city" />
                {/* Adjusted Fog to ensure object is visible but fades out far context */}
                <fog attach="fog" args={['#e5e5e5', 150, 500]} />
                <SoftShadows size={20} samples={10} focus={0.5} />
            </Canvas>
            
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                 <div className="flex items-center gap-2 mb-1">
                     <span className="text-nobel-gold font-mono text-xs tracking-[0.2em] uppercase">Padova Z.I.</span>
                 </div>
                 <div className="text-stone-400 font-mono text-xs tracking-widest">
                    Architectural Model 1:500
                </div>
            </div>
        </div>
    );
};
