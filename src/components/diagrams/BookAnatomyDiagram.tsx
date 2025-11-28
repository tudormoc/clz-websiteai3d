/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Html, Line, RoundedBox, Float, ContactShadows } from '@react-three/drei';
import { AnatomyPartKey } from '../../types';
import * as THREE from 'three';

// Design tokens for Realistic Book
const ANATOMY_COLORS = {
    paper: '#f5f5f0', // Warm white for pages
    cover: '#292524', // Stone-800 for cover
    spine: '#292524',
    gold: '#C5A059',  // Nobel Gold
    highlight: '#C5A059',
    text: '#44403c',
} as const;

interface PartConfig {
    id: AnatomyPartKey;
    labelKey: string;
    descKey: string;
    args: any[]; // [width, height, depth] for Box
    position: [number, number, number];
    rotation?: [number, number, number];
    explodedOffset: [number, number, number];
    labelOffset: [number, number, number];
    colorType: 'cover' | 'paper' | 'gold' | 'spine';
}

// Tighter explosion to keep it looking like a book
const ANATOMY_CONFIG: PartConfig[] = [
    {
        id: 'cover',
        labelKey: 'anatomy.parts.cover.label',
        descKey: 'anatomy.parts.cover.desc',
        args: [2.1, 3.1, 0.08],
        position: [0, 0, 0.25],
        explodedOffset: [0, 0, 0.4],
        labelOffset: [1.2, 1.2, 0],
        colorType: 'cover',
    },
    {
        id: 'endpapers',
        labelKey: 'anatomy.parts.endpapers.label',
        descKey: 'anatomy.parts.endpapers.desc',
        args: [2.05, 3.05, 0.02],
        position: [0, 0, 0.18],
        explodedOffset: [0, 0, 0.2],
        labelOffset: [1.2, 0.8, 0],
        colorType: 'paper',
    },
    {
        id: 'block',
        labelKey: 'anatomy.parts.block.label',
        descKey: 'anatomy.parts.block.desc',
        args: [2, 3, 0.35],
        position: [0, 0, -0.05],
        explodedOffset: [0, 0, 0],
        labelOffset: [1.2, 0, 0],
        colorType: 'paper',
    },
    {
        id: 'spine',
        labelKey: 'anatomy.parts.spine.label',
        descKey: 'anatomy.parts.spine.desc',
        args: [0.15, 3.1, 0.45],
        position: [-1.08, 0, -0.05],
        explodedOffset: [-0.3, 0, 0],
        labelOffset: [-0.8, 0, 0],
        colorType: 'spine',
    },
    {
        id: 'headband',
        labelKey: 'anatomy.parts.headband.label',
        descKey: 'anatomy.parts.headband.desc',
        args: [0.1, 0.35, 0.1], // Cylinder-ish via rounded box or just small box
        position: [-0.95, 1.48, -0.05],
        rotation: [0, 0, Math.PI / 2],
        explodedOffset: [-0.1, 0.1, 0],
        labelOffset: [-0.8, 0.5, 0],
        colorType: 'gold',
    },
    {
        id: 'ribbon',
        labelKey: 'anatomy.parts.ribbon.label',
        descKey: 'anatomy.parts.ribbon.desc',
        args: [0.06, 2.8, 0.02],
        position: [0.2, 0.5, 0.15],
        rotation: [0, 0, 0.05],
        explodedOffset: [0.1, 0, 0.1],
        labelOffset: [1.2, -0.5, 0],
        colorType: 'gold',
    },
];

export const BookAnatomyDiagram: React.FC = () => {
    const { t } = useTranslation();
    const [selectedPart, setSelectedPart] = useState<AnatomyPartKey | null>(null);
    const [hoveredPart, setHoveredPart] = useState<AnatomyPartKey | null>(null);

    const activePart = selectedPart || hoveredPart;

    return (
        <div className="w-full bg-stone-100 border border-stone-200 rounded-sm relative overflow-hidden shadow-inner group">
            <div className="h-[600px] w-full cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [5, 3, 5], fov: 30 }} shadows>
                    <color attach="background" args={['#f5f5f4']} /> {/* stone-100 */}

                    {/* Lighting for Realism */}
                    <ambientLight intensity={0.6} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow shadow-bias={-0.0001} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    <Environment preset="city" />

                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                        <group position={[0, -0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
                            <AnatomySchematic
                                activePart={activePart}
                                onSelect={(p) => setSelectedPart(selectedPart === p ? null : p)}
                                onHover={setHoveredPart}
                            />
                        </group>
                    </Float>

                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />

                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        maxDistance={12}
                        minDistance={3}
                    />
                </Canvas>
            </div>

            {/* Hint */}
            <div className="absolute top-6 left-6 pointer-events-none">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-nobel-gold animate-pulse"></span>
                    {t('anatomy.hint')}
                </p>
            </div>

            {/* Details Overlay */}
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 pointer-events-none">
                <AnimatePresence mode="wait">
                    {activePart && (
                        <motion.div
                            key={activePart}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white/95 backdrop-blur-md p-6 border-l-4 border-nobel-gold shadow-2xl rounded-sm pointer-events-auto"
                        >
                            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-sm mb-2">
                                {t(ANATOMY_CONFIG.find(p => p.id === activePart)?.labelKey || '')}
                            </h4>
                            <p className="text-sm text-stone-600 leading-relaxed">
                                {t(ANATOMY_CONFIG.find(p => p.id === activePart)?.descKey || '')}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const AnatomySchematic = ({
    activePart,
    onSelect,
    onHover
}: {
    activePart: AnatomyPartKey | null,
    onSelect: (p: AnatomyPartKey) => void,
    onHover: (p: AnatomyPartKey | null) => void
}) => {
    const { t } = useTranslation();

    return (
        <>
            {ANATOMY_CONFIG.map((part) => {
                const isActive = activePart === part.id;

                // Calculate final position: base + exploded offset
                const finalPos = new THREE.Vector3(
                    part.position[0] + part.explodedOffset[0],
                    part.position[1] + part.explodedOffset[1],
                    part.position[2] + part.explodedOffset[2]
                );

                const labelWorldPos = finalPos.clone().add(new THREE.Vector3(...part.labelOffset));

                // Determine color
                let materialColor = ANATOMY_COLORS.paper;
                if (part.colorType === 'cover') materialColor = ANATOMY_COLORS.cover;
                if (part.colorType === 'spine') materialColor = ANATOMY_COLORS.spine;
                if (part.colorType === 'gold') materialColor = ANATOMY_COLORS.gold;

                return (
                    <group key={part.id}>
                        <group position={finalPos} rotation={part.rotation as any}>
                            <RoundedBox
                                args={part.args as any}
                                radius={0.02}
                                smoothness={4}
                                onClick={(e) => { e.stopPropagation(); onSelect(part.id); }}
                                onPointerOver={(e) => { e.stopPropagation(); onHover(part.id); }}
                                onPointerOut={(e) => { e.stopPropagation(); onHover(null); }}
                            >
                                <meshStandardMaterial
                                    color={isActive ? ANATOMY_COLORS.highlight : materialColor}
                                    roughness={0.4}
                                    metalness={0.1}
                                />
                            </RoundedBox>
                        </group>

                        {/* Subtle Connector Line */}
                        <Line
                            points={[finalPos, labelWorldPos]}
                            color={isActive ? ANATOMY_COLORS.gold : '#d6d3d1'} // stone-300
                            lineWidth={1}
                            transparent
                            opacity={isActive ? 0.8 : 0.3}
                        />

                        {/* Minimal Label */}
                        <Html position={labelWorldPos} center>
                            <div
                                className={`
                                    px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer select-none flex items-center gap-2
                                    ${isActive
                                        ? 'bg-stone-900 text-white shadow-lg scale-105 z-50'
                                        : 'bg-white/90 text-stone-400 hover:text-stone-900 hover:bg-white shadow-sm'
                                    }
                                `}
                                onMouseEnter={() => onHover(part.id)}
                                onMouseLeave={() => onHover(null)}
                                onClick={() => onSelect(part.id)}
                            >
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-nobel-gold" />}
                                {t(part.labelKey)}
                            </div>
                        </Html>
                    </group>
                );
            })}
        </>
    );
};
