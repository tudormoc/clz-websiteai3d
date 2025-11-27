/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MousePointer2 } from 'lucide-react';
import { SectionLabel, Headline, Body, ListItemButton, SpecItem } from '../Typography';
import { BindingTypeKey, bindingTypeKeys } from '../../types';

const BindingBook3D = ({ bindingType, isActive }: { bindingType: BindingTypeKey, isActive: boolean }) => {
    const groupRef = useRef<THREE.Group>(null);
    const coverRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Gentle floating rotation
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
        if (coverRef.current && bindingType !== 'leporello') {
            // Open cover slightly when active
            const targetOpen = isActive ? -0.4 : 0;
            coverRef.current.rotation.y = THREE.MathUtils.lerp(coverRef.current.rotation.y, targetOpen, delta * 3);
        }
    });

    // Different visual representations for each binding type
    const renderBinding = () => {
        switch (bindingType) {
            case 'perfect':
                return (
                    <group ref={groupRef}>
                        {/* Back Cover */}
                        <mesh position={[0, 0, -0.12]}>
                            <boxGeometry args={[1.8, 2.6, 0.04]} />
                            <meshStandardMaterial color="#2d3748" roughness={0.3} />
                        </mesh>
                        {/* Spine */}
                        <mesh position={[-0.92, 0, 0]}>
                            <boxGeometry args={[0.08, 2.6, 0.28]} />
                            <meshStandardMaterial color="#2d3748" roughness={0.3} />
                        </mesh>
                        {/* Book Block */}
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[1.75, 2.5, 0.2]} />
                            <meshStandardMaterial color="#EBE9E4" roughness={0.8} />
                        </mesh>
                        {/* Front Cover */}
                        <group ref={coverRef} position={[-0.92, 0, 0.12]}>
                            <mesh position={[0.92, 0, 0]}>
                                <boxGeometry args={[1.8, 2.6, 0.04]} />
                                <meshStandardMaterial color="#2d3748" roughness={0.3} />
                            </mesh>
                        </group>
                    </group>
                );

            case 'swiss':
                return (
                    <group ref={groupRef} rotation={[0, 0.2, 0]}>
                        <mesh position={[-0.95, 0, 0]}>
                            <boxGeometry args={[1.8, 2.6, 0.05]} />
                            <meshStandardMaterial color="#4a5568" roughness={0.4} />
                        </mesh>
                        <mesh position={[0.95, 0, 0]}>
                            <boxGeometry args={[1.8, 2.6, 0.05]} />
                            <meshStandardMaterial color="#4a5568" roughness={0.4} />
                        </mesh>
                        <mesh position={[0.95, 0, 0.17]}>
                            <boxGeometry args={[1.65, 2.45, 0.25]} />
                            <meshStandardMaterial color="#F5F4F0" roughness={0.8} />
                        </mesh>
                    </group>
                );

            case 'bodonian':
                return (
                    <group ref={groupRef}>
                        <mesh position={[0.05, 0, -0.16]}>
                            <boxGeometry args={[1.75, 2.6, 0.06]} />
                            <meshStandardMaterial color="#5c4033" roughness={0.5} />
                        </mesh>
                        <mesh position={[0.05, 0, 0]}>
                            <boxGeometry args={[1.7, 2.5, 0.22]} />
                            <meshStandardMaterial color="#EBE9E4" roughness={0.8} />
                        </mesh>
                        <mesh position={[-0.85, 0, 0]}>
                            <boxGeometry args={[0.12, 2.5, 0.24]} />
                            <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
                        </mesh>
                        {[...Array(8)].map((_, i) => (
                            <mesh key={i} position={[-0.85, -1.1 + i * 0.32, 0.13]}>
                                <boxGeometry args={[0.13, 0.02, 0.01]} />
                                <meshStandardMaterial color="#b8a888" roughness={0.8} />
                            </mesh>
                        ))}
                        <group ref={coverRef} position={[-0.78, 0, 0.14]}>
                            <mesh position={[0.88, 0, 0]}>
                                <boxGeometry args={[1.75, 2.6, 0.06]} />
                                <meshStandardMaterial color="#5c4033" roughness={0.5} />
                            </mesh>
                        </group>
                    </group>
                );

            case 'halfleather':
                return (
                    <group ref={groupRef}>
                        <mesh position={[0.15, 0, -0.13]}>
                            <boxGeometry args={[1.5, 2.6, 0.04]} />
                            <meshStandardMaterial color="#8b7355" roughness={0.8} />
                        </mesh>
                        <mesh position={[-0.78, 0, -0.13]}>
                            <boxGeometry args={[0.35, 2.6, 0.045]} />
                            <meshStandardMaterial color="#5c3d2e" roughness={0.4} />
                        </mesh>
                        <mesh position={[-0.92, 0, 0]}>
                            <boxGeometry args={[0.12, 2.6, 0.3]} />
                            <meshStandardMaterial color="#5c3d2e" roughness={0.4} />
                        </mesh>
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[1.7, 2.5, 0.2]} />
                            <meshStandardMaterial color="#EBE9E4" roughness={0.8} />
                        </mesh>
                        <group ref={coverRef} position={[-0.92, 0, 0.13]}>
                            <mesh position={[1.07, 0, 0]}>
                                <boxGeometry args={[1.5, 2.6, 0.04]} />
                                <meshStandardMaterial color="#8b7355" roughness={0.8} />
                            </mesh>
                            <mesh position={[0.14, 0, 0]}>
                                <boxGeometry args={[0.35, 2.6, 0.045]} />
                                <meshStandardMaterial color="#5c3d2e" roughness={0.4} />
                            </mesh>
                        </group>
                    </group>
                );

            case 'leporello':
                return (
                    <group ref={groupRef}>
                        <mesh position={[-1.2, 0, 0]}>
                            <boxGeometry args={[0.06, 2.5, 1.6]} />
                            <meshStandardMaterial color="#3d4852" roughness={0.3} />
                        </mesh>
                        {[...Array(6)].map((_, i) => (
                            <mesh
                                key={i}
                                position={[-0.9 + i * 0.36, 0, i % 2 === 0 ? 0.1 : -0.1]}
                                rotation={[0, i % 2 === 0 ? 0.15 : -0.15, 0]}
                            >
                                <boxGeometry args={[0.02, 2.4, 1.5]} />
                                <meshStandardMaterial
                                    color={i % 2 === 0 ? "#F5F4F0" : "#EBE9E4"}
                                    roughness={0.9}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>
                        ))}
                        <mesh position={[1.0, 0, 0]}>
                            <boxGeometry args={[0.06, 2.5, 1.6]} />
                            <meshStandardMaterial color="#3d4852" roughness={0.3} />
                        </mesh>
                    </group>
                );

            case 'octavius':
                return (
                    <group ref={groupRef} rotation={[0.3, 0.15, 0]}>
                        <mesh position={[-0.8, 0, -0.25]} rotation={[0, 0.35, 0]}>
                            <boxGeometry args={[1.6, 2.5, 0.04]} />
                            <meshStandardMaterial color="#2d3748" roughness={0.4} />
                        </mesh>
                        <mesh position={[0.8, 0, -0.25]} rotation={[0, -0.35, 0]}>
                            <boxGeometry args={[1.6, 2.5, 0.04]} />
                            <meshStandardMaterial color="#2d3748" roughness={0.4} />
                        </mesh>
                        <mesh position={[-0.65, 0, -0.15]} rotation={[0, 0.3, 0]}>
                            <boxGeometry args={[1.4, 2.4, 0.08]} />
                            <meshStandardMaterial color="#EBE9E4" roughness={0.8} />
                        </mesh>
                        <mesh position={[0.65, 0, -0.15]} rotation={[0, -0.3, 0]}>
                            <boxGeometry args={[1.4, 2.4, 0.05]} />
                            <meshStandardMaterial color="#F5F4F0" roughness={0.9} />
                        </mesh>
                        <mesh position={[-1.5, 0, 0.25]} rotation={[0, 0.7, 0]}>
                            <boxGeometry args={[1.1, 2.3, 0.01]} />
                            <meshStandardMaterial color="#FAFAF8" roughness={0.9} side={THREE.DoubleSide} />
                        </mesh>
                        <mesh position={[1.55, 0, 0.3]} rotation={[0, -0.75, 0]}>
                            <boxGeometry args={[1.2, 2.3, 0.01]} />
                            <meshStandardMaterial color="#FFFEF8" roughness={0.9} side={THREE.DoubleSide} />
                        </mesh>
                    </group>
                );

            default:
                return null;
        }
    };

    return renderBinding();
};

const BindingTypeButton = ({
    typeKey,
    isSelected,
    onClick
}: {
    typeKey: BindingTypeKey,
    isSelected: boolean,
    onClick: () => void
}) => {
    const { t } = useTranslation();

    return (
        <ListItemButton
            isActive={isSelected}
            onClick={onClick}
            variant="light"
        >
            <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${isSelected ? 'text-nobel-gold' : 'text-white'}`}>
                {t(`bindings.types.${typeKey}.name`)}
            </span>
            <p className="text-xs text-stone-500 mt-1">
                {t(`bindings.types.${typeKey}.tagline`)}
            </p>
        </ListItemButton>
    );
};

export const BindingTypesShowcase: React.FC = () => {
    const { t } = useTranslation();
    const [selectedType, setSelectedType] = useState<BindingTypeKey>('perfect');

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 w-full">
            {/* Left: Selection List */}
            <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col">
                <div className="space-y-1">
                    {bindingTypeKeys.map((typeKey) => (
                        <BindingTypeButton
                            key={typeKey}
                            typeKey={typeKey}
                            isSelected={selectedType === typeKey}
                            onClick={() => setSelectedType(typeKey)}
                        />
                    ))}
                </div>

                {/* Specs Panel */}
                <div className="mt-8 p-5 bg-stone-800/30 border border-stone-800 rounded-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <SpecItem
                            label={t('bindings.specs_labels.method')}
                            value={t(`bindings.types.${selectedType}.specs.method`)}
                            variant="light"
                        />
                        <SpecItem
                            label={t('bindings.specs_labels.spine')}
                            value={t(`bindings.types.${selectedType}.specs.spine`)}
                            variant="light"
                        />
                        <SpecItem
                            label={t('bindings.specs_labels.durability')}
                            value={t(`bindings.types.${selectedType}.specs.durability`)}
                            variant="light"
                        />
                        <SpecItem
                            label={t('bindings.specs_labels.ideal')}
                            value={t(`bindings.types.${selectedType}.specs.ideal`)}
                            variant="light"
                        />
                    </div>
                </div>
            </div>

            {/* Right: 3D Viewer */}
            <div
                className="order-1 lg:order-2 lg:col-span-8 h-[350px] lg:h-[500px] bg-stone-900 rounded-sm relative overflow-hidden border border-stone-800"
                style={{ touchAction: 'none' }}
            >
                <Canvas shadows camera={{ position: [0, 0, 7], fov: 35 }}>
                    <ambientLight intensity={0.8} />
                    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} castShadow intensity={1.5} />
                    <pointLight position={[-10, -5, -5]} color="#C5A059" intensity={0.8} />
                    <pointLight position={[5, 5, 5]} color="#ffffff" intensity={0.5} />

                    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                        <BindingBook3D bindingType={selectedType} isActive={true} />
                    </Float>

                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                    <Environment preset="studio" />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        rotateSpeed={0.5}
                        minPolarAngle={0.2}
                        maxPolarAngle={Math.PI - 0.2}
                    />
                </Canvas>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none select-none">
                    <motion.div
                        key={selectedType}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SectionLabel className="mb-2">
                            {t(`bindings.types.${selectedType}.tagline`)}
                        </SectionLabel>
                        <Headline as="h3" variant="light" size="sm" className="mb-3">
                            {t(`bindings.types.${selectedType}.name`)}
                        </Headline>
                        <Body variant="light" className="max-w-lg">
                            {t(`bindings.types.${selectedType}.desc`)}
                        </Body>
                    </motion.div>
                </div>

                {/* Hint */}
                <div className="absolute top-4 right-4 flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-widest pointer-events-none select-none">
                    <MousePointer2 size={12} />
                    <span>{t('bindings.hint')}</span>
                </div>
            </div>
        </div>
    );
};
