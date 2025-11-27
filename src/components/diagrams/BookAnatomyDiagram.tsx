/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Edges } from '@react-three/drei';
import { MousePointer2 } from 'lucide-react';
import { SectionLabel, Headline, Body } from '../Typography';
import { AnatomyPartKey } from '../../types';

// Design tokens for 3D schematic (matches CSS variables)
const ANATOMY_COLORS = {
    base: '#e5e5e5',
    active: '#C5A059', // --color-gold
    edge: '#57534e',   // stone-600
    activeEdge: '#C5A059',
} as const;

export const BookAnatomyDiagram: React.FC = () => {
    const { t } = useTranslation();
    const [selectedPart, setSelectedPart] = useState<AnatomyPartKey | null>(null);
    const [hoveredPart, setHoveredPart] = useState<AnatomyPartKey | null>(null);

    const parts = useMemo(() => [
        { id: 'cover' as const, labelKey: 'anatomy.parts.cover.label', descKey: 'anatomy.parts.cover.desc' },
        { id: 'spine' as const, labelKey: 'anatomy.parts.spine.label', descKey: 'anatomy.parts.spine.desc' },
        { id: 'hinge' as const, labelKey: 'anatomy.parts.hinge.label', descKey: 'anatomy.parts.hinge.desc' },
        { id: 'block' as const, labelKey: 'anatomy.parts.block.label', descKey: 'anatomy.parts.block.desc' },
        { id: 'endpapers' as const, labelKey: 'anatomy.parts.endpapers.label', descKey: 'anatomy.parts.endpapers.desc' },
        { id: 'headband' as const, labelKey: 'anatomy.parts.headband.label', descKey: 'anatomy.parts.headband.desc' },
        { id: 'ribbon' as const, labelKey: 'anatomy.parts.ribbon.label', descKey: 'anatomy.parts.ribbon.desc' },
    ], []);

    const activePart = selectedPart || hoveredPart;
    const activeData = activePart ? parts.find(p => p.id === activePart) : null;

    return (
        <div className="flex flex-col gap-6 mt-6">
            {/* Schematic Viewer - uses CSS var --color-paper-light */}
            <div className="w-full h-[400px] lg:h-[500px] bg-[var(--color-paper-light)] border border-stone-200 rounded-sm relative overflow-hidden shadow-inner group cursor-crosshair">
                <Canvas camera={{ position: [5, 3, 5], fov: 30 }}>
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[10, 10, 5]} intensity={0.5} />
                    <Environment preset="city" />
                    <group position={[0, -0.5, 0]}>
                        <AnatomySchematic
                            activePart={activePart}
                            onSelect={(p) => setSelectedPart(selectedPart === p ? null : p)}
                            onHover={setHoveredPart}
                        />
                    </group>
                    <OrbitControls
                        enableZoom={false}
                        enableRotate={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Canvas>

                {/* Overlay Info */}
                <AnimatePresence mode="wait">
                    {activeData ? (
                        <motion.div
                            key={activeData.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white/95 backdrop-blur-md p-6 border-l-4 border-nobel-gold shadow-2xl rounded-sm pointer-events-none"
                        >
                            <SectionLabel className="mb-2">{t('anatomy.label')}</SectionLabel>
                            <Headline as="h4" size="sm" className="italic mb-2">{t(activeData.labelKey)}</Headline>
                            <Body size="sm">{t(activeData.descKey)}</Body>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-6 left-0 right-0 text-center pointer-events-none"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-stone-200 text-xs font-bold uppercase tracking-widest text-stone-500 shadow-sm">
                                <MousePointer2 size={14} /> {t('anatomy.hint')}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Parts Selector */}
            <div className="flex flex-wrap gap-3 justify-center">
                {parts.map((part) => (
                    <button
                        key={part.id}
                        onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
                        onMouseEnter={() => setHoveredPart(part.id)}
                        onMouseLeave={() => setHoveredPart(null)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-sm border transition-all duration-300 ${activePart === part.id
                            ? 'bg-stone-900 text-white border-stone-900 shadow-lg scale-105'
                            : 'bg-white text-stone-500 border-stone-200 hover:border-nobel-gold hover:text-stone-900'
                            }`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full ${activePart === part.id ? 'bg-nobel-gold' : 'bg-stone-300'}`}></div>
                        <span className="text-xs font-bold uppercase tracking-widest">{t(part.labelKey)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const AnatomySchematic = ({ activePart, onSelect, onHover }: { activePart: AnatomyPartKey | null, onSelect: (p: AnatomyPartKey) => void, onHover: (p: AnatomyPartKey | null) => void }) => {
    // Use centralized color tokens
    const { base: baseColor, active: activeColor, edge: edgeColor, activeEdge: activeEdgeColor } = ANATOMY_COLORS;

    const SchematicPart = ({
        id,
        position,
        rotation = [0, 0, 0],
        args,
        type = 'box'
    }: {
        id: AnatomyPartKey,
        position: [number, number, number],
        rotation?: [number, number, number],
        args: any[],
        type?: 'box' | 'cylinder'
    }) => {
        const isActive = activePart === id;
        const targetY = isActive ? position[1] + 0.1 : position[1];

        return (
            <group position={[position[0], targetY, position[2]]} rotation={rotation as any}>
                <mesh
                    onClick={(e) => { e.stopPropagation(); onSelect(id); }}
                    onPointerOver={(e) => { e.stopPropagation(); onHover(id); }}
                    onPointerOut={(e) => { e.stopPropagation(); onHover(null); }}
                >
                    {type === 'box' ? <boxGeometry args={args as any} /> : <cylinderGeometry args={args as any} />}
                    <meshStandardMaterial
                        color={isActive ? activeColor : baseColor}
                        transparent
                        opacity={isActive ? 0.9 : 0.3}
                        roughness={0.8}
                    />
                    <Edges
                        scale={1}
                        threshold={15}
                        color={isActive ? activeEdgeColor : edgeColor}
                    />
                </mesh>
            </group>
        );
    };

    return (
        <group rotation={[0, -Math.PI / 4, 0]}>
            <SchematicPart id="cover" position={[0, 0, 0.8]} args={[2, 3, 0.05]} />
            <SchematicPart id="endpapers" position={[0, 0, 0.5]} args={[1.9, 2.9, 0.01]} />
            <SchematicPart id="block" position={[0, 0, 0]} args={[1.9, 2.9, 0.4]} />
            <SchematicPart id="spine" position={[-1.4, 0, 0]} args={[0.1, 3, 0.5]} />
            <SchematicPart id="headband" position={[-1.1, 1.45, 0]} rotation={[0, 0, Math.PI / 2]} args={[0.04, 0.04, 0.24, 16]} type="cylinder" />
            <SchematicPart id="headband" position={[-1.1, -1.45, 0]} rotation={[0, 0, Math.PI / 2]} args={[0.04, 0.04, 0.24, 16]} type="cylinder" />
            <SchematicPart id="ribbon" position={[0.2, 0.5, 0.25]} rotation={[0, 0, 0.1]} args={[0.04, 2.5, 0.01]} />
            <SchematicPart id="cover" position={[0, 0, -0.8]} args={[2, 3, 0.05]} />
            <SchematicPart id="hinge" position={[-1.1, 0, 0.4]} args={[0.05, 2.8, 0.02]} />
            <SchematicPart id="hinge" position={[-1.1, 0, -0.4]} args={[0.05, 2.8, 0.02]} />
        </group>
    );
};
