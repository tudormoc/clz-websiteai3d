/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Maximize2, RotateCw, ArrowRight, CheckCircle2, Ruler, BoxSelect, Weight, Layers, ScanLine, MoveHorizontal, MoveVertical, MousePointer2, ZoomIn } from 'lucide-react';

// --- 1. THE PROCESS: CHRONOLOGICAL TIMELINE ---

export const BindingLayersDiagram: React.FC = () => {
  const { t } = useTranslation();
  
  const steps = useMemo(() => [
    { id: 'print', label: t('process.steps.print.label'), desc: t('process.steps.print.desc'), visual: t('process.steps.print.visual') },
    { id: 'cut', label: t('process.steps.cut.label'), desc: t('process.steps.cut.desc'), visual: t('process.steps.cut.visual') },
    { id: 'fold', label: t('process.steps.fold.label'), desc: t('process.steps.fold.desc'), visual: t('process.steps.fold.visual') },
    { id: 'gather', label: t('process.steps.gather.label'), desc: t('process.steps.gather.desc') },
    { id: 'block', label: t('process.steps.block.label'), desc: t('process.steps.block.desc'), visual: t('process.steps.block.visual') },
    { id: 'cover', label: t('process.steps.cover.label'), desc: t('process.steps.cover.desc') }
  ], [t]);

  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start p-8 bg-white rounded-sm shadow-sm border border-stone-200 my-8">
      
      {/* Controls */}
      <div className="w-full lg:w-1/3 flex flex-col gap-2">
         <div className="mb-4">
             <span className="text-sm font-bold text-nobel-gold uppercase tracking-widest">{t('process.cycle')}</span>
             <h3 className="font-serif text-3xl text-stone-900 mt-2">{steps[activeStep].label}</h3>
             <p className="text-base text-stone-500 mt-3 h-12 leading-relaxed">{steps[activeStep].desc}</p>
         </div>

         <div className="space-y-1 relative">
             <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-stone-100"></div>
             {steps.map((step, idx) => (
                 <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`relative w-full flex items-center gap-4 p-4 rounded-sm transition-all duration-300 group ${activeStep === idx ? 'bg-stone-50' : 'hover:bg-stone-50'}`}
                 >
                     <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${activeStep === idx ? 'border-nobel-gold bg-nobel-gold text-white' : activeStep > idx ? 'border-nobel-gold bg-white text-nobel-gold' : 'border-stone-200 bg-white text-stone-300'}`}>
                         {activeStep > idx ? <CheckCircle2 size={14} /> : idx + 1}
                     </div>
                     <span className={`text-sm font-bold uppercase tracking-wider ${activeStep === idx ? 'text-stone-900' : 'text-stone-400 group-hover:text-stone-600'}`}>
                         {step.label}
                     </span>
                 </button>
             ))}
         </div>
      </div>

      {/* Visualizer */}
      <div className="w-full lg:w-2/3 h-[400px] bg-[#F5F4F0] border border-stone-200 relative flex items-center justify-center overflow-hidden perspective-1000 rounded-sm">
         <AnimatePresence mode="wait">
            {/* 1. PRINTED SHEETS */}
            {activeStep === 0 && (
                <motion.div
                    key="print"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-80 h-60 bg-white shadow-lg border border-stone-200 relative flex items-center justify-center"
                >
                    <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full h-full p-4 opacity-20">
                        {[...Array(8)].map((_, i) => <div key={i} className="bg-stone-800 w-full h-full"></div>)}
                    </div>
                    <span className="absolute font-serif text-3xl text-stone-400 italic text-center px-4">{steps[0].visual}</span>
                </motion.div>
            )}

            {/* 2. CUTTING */}
            {activeStep === 1 && (
                <motion.div key="cut" className="relative grid grid-cols-2 gap-4">
                     {[1,2].map(i => (
                        <motion.div
                            key={i}
                            initial={{ width: '18rem', opacity: 0 }}
                            animate={{ width: '9rem', opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="h-60 bg-white shadow-md border border-stone-200 relative"
                        >
                            <div className="absolute top-0 right-0 p-2 text-xs text-stone-400">{steps[1].visual}</div>
                        </motion.div>
                     ))}
                </motion.div>
            )}

            {/* 3. FOLDING */}
            {activeStep === 2 && (
                <motion.div key="fold" className="flex items-center justify-center">
                    <motion.div
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: -160 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="w-36 h-56 bg-white shadow-xl border-l border-stone-300 origin-left relative"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-stone-300 font-serif text-2xl">{steps[2].visual}</div>
                    </motion.div>
                    <div className="w-36 h-56 bg-stone-50 border border-stone-200 shadow-sm"></div>
                </motion.div>
            )}

            {/* 4. GATHERING & SEWING */}
            {activeStep === 3 && (
                <motion.div key="gather" className="flex flex-col items-center -space-y-12 transform rotate-x-12">
                     {[1,2,3,4,5].map(i => (
                        <motion.div
                            key={i}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-36 h-8 bg-white border border-stone-300 shadow-sm relative z-10"
                        >
                            {/* Thread */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-nobel-gold/50"></div>
                        </motion.div>
                     ))}
                </motion.div>
            )}

            {/* 5. BOOK BLOCK */}
            {activeStep === 4 && (
                 <motion.div
                    key="block"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, rotateY: -30, rotateX: 10 }}
                    className="w-36 h-56 bg-[#EBE9E4] relative shadow-2xl"
                    style={{ transformStyle: 'preserve-3d' }}
                 >
                     {/* Spine Glue/Mull */}
                     <div className="absolute left-0 top-0 bottom-0 w-4 bg-stone-200/80 backdrop-blur-sm transform -translate-x-4 rotate-y-90 origin-right border-l border-stone-300 flex flex-col justify-center items-center gap-1">
                        <div className="w-full h-px bg-stone-300"></div>
                        <div className="w-full h-px bg-stone-300"></div>
                     </div>
                     {/* Top */}
                     <div className="absolute top-0 left-0 w-full h-8 bg-[#F0EFE9] transform -translate-y-8 rotate-x-90 origin-bottom border border-stone-200"></div>
                     {/* Front */}
                     <div className="absolute inset-0 border border-stone-200 flex items-center justify-center">
                        <div className="text-xs text-stone-400 font-mono tracking-widest rotate-90">{steps[4].visual}</div>
                     </div>
                 </motion.div>
            )}

             {/* 6. COVER & DETAILS */}
             {activeStep === 5 && (
                 <motion.div
                    key="cover"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: -25, rotateX: 5 }}
                    transition={{ type: 'spring', stiffness: 40 }}
                    className="w-40 h-60 bg-[#1a1a1a] relative shadow-2xl flex items-center justify-center border-l-4 border-stone-800"
                    style={{ transformStyle: 'preserve-3d' }}
                 >
                     <div className="absolute top-4 w-full text-center text-nobel-gold font-serif text-xl tracking-widest">CLZ</div>
                     <div className="w-20 h-20 border border-nobel-gold/30 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 border border-nobel-gold/60 rounded-full"></div>
                     </div>
                     {/* Thickness */}
                     <div className="absolute right-0 top-0 h-full w-2 bg-stone-800 transform translate-x-2 rotate-y-90 origin-left"></div>
                 </motion.div>
             )}
         </AnimatePresence>
      </div>
    </div>
  );
};


// --- 2. ELEMENTS OF STYLE: 3D INTERACTIVE BOOK ---

const CameraRig = ({ selectedPart }: { selectedPart: string | null }) => {
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);
    const isUserInteracting = useRef(false);
    const targetPos = useRef(new THREE.Vector3(0, 0, 10)); // Default distance set to 10 for full view
    
    useEffect(() => {
        let x = 0, y = 0, z = 10; // Base "Wide Shot"

        switch (selectedPart) {
            case 'headband': x = 0; y = 1.2; z = 7; break; // Closer but not macro
            case 'spine': x = -2; y = 0; z = 8; break; // Side view with context
            case 'endpapers': x = 1; y = 0; z = 9; break; // Front view
            case 'block': x = 1; y = -1; z = 9; break; // Corner view
            default: x = 0; y = 0; z = 10; break; // Wide shot
        }

        targetPos.current.set(x, y, z);
        // Reset interaction flag when selection changes via UI to allow camera to move
        isUserInteracting.current = false;
    }, [selectedPart]);

    useFrame((state, delta) => {
        if (!isUserInteracting.current) {
            // Smoothly move camera to target position if user isn't dragging
            state.camera.position.lerp(targetPos.current, delta * 2.5);
        }
        // Always ensure controls look at center
        if(controlsRef.current) controlsRef.current.target.lerp(new THREE.Vector3(0,0,0), 0.1);
    });

    return (
        <OrbitControls 
            ref={controlsRef}
            makeDefault
            enableZoom={false} // Disabled Zoom for fixed view
            enablePan={false}
            rotateSpeed={0.5}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI - 0.2}
            onStart={() => { isUserInteracting.current = true; }}
        />
    );
}

const Book3DModel = ({ selectedPart }: { selectedPart: string | null }) => {
    const coverGroupRef = useRef<THREE.Group>(null);
    
    // Open cover if Endpapers or Cover is selected
    const targetOpen = (selectedPart === 'endpapers' || selectedPart === 'cover') ? -Math.PI / 2.2 : 0;

    useFrame((state, delta) => {
        if (coverGroupRef.current) {
            coverGroupRef.current.rotation.y = THREE.MathUtils.lerp(coverGroupRef.current.rotation.y, targetOpen, delta * 3);
        }
    });

    // Highlighting logic
    const getMaterial = (partName: string, baseColor: string, roughness: number = 0.5, emissive: boolean = false) => (
        <meshStandardMaterial 
            color={selectedPart === partName ? '#C5A059' : baseColor} 
            emissive={selectedPart === partName && emissive ? '#C5A059' : '#000'}
            emissiveIntensity={selectedPart === partName && emissive ? 0.4 : 0}
            roughness={selectedPart === partName ? 0.2 : roughness}
            metalness={selectedPart === partName ? 0.5 : 0}
        />
    );

    return (
        <group rotation={[0, -0.4, 0]}>
            {/* Back Cover */}
            <mesh position={[0, 0, -0.15]} receiveShadow>
                <boxGeometry args={[2.1, 3.1, 0.05]} />
                {getMaterial('cover', '#1a1a1a', 0.3)}
            </mesh>

            {/* Spine */}
            <mesh position={[-1.05, 0, 0]} receiveShadow>
                <boxGeometry args={[0.12, 3.1, 0.35]} />
                {getMaterial('spine', '#1a1a1a', 0.3, true)}
            </mesh>

            {/* Book Block (Pages) */}
            <group position={[0.05, 0, 0]}>
                <mesh receiveShadow castShadow>
                    <boxGeometry args={[2, 3, 0.25]} />
                    {getMaterial('block', '#EBE9E4', 0.8, true)}
                </mesh>
                
                {/* Headband Top */}
                <mesh position={[-0.95, 1.45, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.20, 16]} />
                    <meshStandardMaterial color={selectedPart === 'headband' ? '#C5A059' : '#C5A059'} emissive={selectedPart === 'headband' ? '#C5A059' : '#000'} emissiveIntensity={selectedPart === 'headband' ? 0.8 : 0} />
                </mesh>
                 {/* Headband Bottom */}
                 <mesh position={[-0.95, -1.45, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.20, 16]} />
                    <meshStandardMaterial color={selectedPart === 'headband' ? '#C5A059' : '#C5A059'} />
                </mesh>
            </group>

            {/* Front Cover (Animated) */}
            <group ref={coverGroupRef} position={[-1.05, 0, 0.15]}>
                <mesh position={[1.05, 0, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.1, 3.1, 0.05]} />
                    {getMaterial('cover', '#1a1a1a', 0.3)}
                </mesh>
                {/* Endpaper (Inside Cover) */}
                <mesh position={[1.05, 0, -0.026]}>
                    <planeGeometry args={[2.05, 3.05]} />
                     {getMaterial('endpapers', '#F5F4F0', 0.9, true)}
                </mesh>
            </group>
        </group>
    );
};

export const BookAnatomyDiagram: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  
  const parts = useMemo(() => [
      { id: 'cover', label: t('anatomy.parts.cover.label'), desc: t('anatomy.parts.cover.desc') },
      { id: 'spine', label: t('anatomy.parts.spine.label'), desc: t('anatomy.parts.spine.desc') },
      { id: 'headband', label: t('anatomy.parts.headband.label'), desc: t('anatomy.parts.headband.desc') },
      { id: 'endpapers', label: t('anatomy.parts.endpapers.label'), desc: t('anatomy.parts.endpapers.desc') },
      { id: 'block', label: t('anatomy.parts.block.label'), desc: t('anatomy.parts.block.desc') },
  ], [t]);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 w-full my-8">
      
      {/* Visualizer (Top on Mobile, Right on Desktop) */}
      <div 
        className="order-1 lg:order-2 lg:col-span-8 h-[350px] lg:h-[550px] bg-[#F5F4F0] rounded-sm relative border border-stone-200 shadow-inner overflow-hidden group"
        style={{ touchAction: 'none' }} // Prevents scroll capture on mobile while dragging
      >
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} castShadow intensity={1.5} />
            <pointLight position={[-10, -5, -5]} color="#C5A059" intensity={1} />
            
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                <Book3DModel selectedPart={selectedPart} />
            </Float>

            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
            <Environment preset="studio" />
            <CameraRig selectedPart={selectedPart} />
        </Canvas>

        {/* Interaction Hint */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-stone-200 shadow-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                <MousePointer2 size={14} />
                <span>{t('anatomy.hint')}</span>
            </div>
        </div>
      </div>

      {/* List (Bottom on Mobile, Left on Desktop) */}
      <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-2">
         <div className="mb-4">
             <span className="text-sm font-bold text-nobel-gold uppercase tracking-widest">{t('anatomy.label')}</span>
             <h3 className="font-serif text-3xl text-stone-900 mt-2">
                {selectedPart ? parts.find(p => p.id === selectedPart)?.label : t('anatomy.default_title')}
             </h3>
             {/* Updated paragraph to use min-height instead of fixed height to prevent text overlap */}
             <p className="text-base text-stone-500 mt-3 min-h-[4rem] leading-relaxed pb-4">
                {selectedPart ? parts.find(p => p.id === selectedPart)?.desc : t('anatomy.default_desc')}
             </p>
         </div>

         <div className="space-y-1">
             {parts.map((part) => (
                 <button
                    key={part.id}
                    onClick={() => setSelectedPart(part.id)}
                    className={`w-full text-left px-4 py-5 border-l-2 transition-all duration-300 group ${selectedPart === part.id ? 'border-nobel-gold bg-stone-50 pl-6' : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'}`}
                 >
                     <div className="flex items-center justify-between">
                         <span className={`text-sm font-bold uppercase tracking-wider ${selectedPart === part.id ? 'text-stone-900' : 'text-stone-400 group-hover:text-stone-600'}`}>
                             {part.label}
                         </span>
                         {selectedPart === part.id && <ArrowRight size={16} className="text-nobel-gold" />}
                     </div>
                 </button>
             ))}
         </div>
      </div>
    </div>
  );
};


// --- 3. SCALE MATTERS: DUAL SLIDER CONFIGURATOR (NO SCROLL BUG) ---

export const FormatComparisonDiagram: React.FC = () => {
    const { t } = useTranslation();
    // Standard dimensions
    const MAX_W = 435;
    const MAX_H = 605;
    const MIN_W = 150;
    const MIN_H = 200;

    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(400);
    
    // Calculate scale relative to max container
    // Max display area approx 300px wide
    const scaleFactor = 0.6; 

    return (
        <div className="bg-stone-900 border border-stone-800 p-8 rounded-sm shadow-xl max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-8 pb-4 border-b border-stone-800">
                <div>
                    <h3 className="font-serif text-3xl text-white italic">{t('formats.config.title')}</h3>
                    <p className="text-stone-500 text-xs uppercase tracking-widest mt-2">{t('formats.config.limit')}</p>
                </div>
                <div className="text-right">
                     <div className="text-4xl font-mono text-nobel-gold">{width}<span className="text-base text-stone-600 ml-1">mm</span> <span className="text-stone-700 mx-1">x</span> {height}<span className="text-base text-stone-600 ml-1">mm</span></div>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="h-[450px] bg-[#111] relative flex items-center justify-center border border-stone-800/50 overflow-hidden mb-8 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px]">
                
                {/* Max Limit Outline */}
                <div 
                    className="absolute border border-dashed border-stone-700 flex items-start justify-start p-2"
                    style={{ 
                        width: `${MAX_W * scaleFactor}px`, 
                        height: `${MAX_H * scaleFactor}px` 
                    }}
                >
                    <span className="text-[10px] text-stone-700 font-mono uppercase">{t('formats.config.max_cap')}: 435 x 605</span>
                </div>

                {/* Dynamic Book */}
                <div 
                    className="bg-stone-200 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative transition-all duration-75 ease-out origin-center flex items-center justify-center"
                    style={{ 
                        width: `${width * scaleFactor}px`, 
                        height: `${height * scaleFactor}px` 
                    }}
                >
                    {/* Book Spine */}
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-stone-300 border-r border-stone-400"></div>
                    
                    {/* Dimensions on Book */}
                    <div className="text-center opacity-50 pointer-events-none">
                        <div className="text-stone-900 font-serif text-3xl font-bold">CLZ</div>
                        <div className="text-xs tracking-[0.3em] text-stone-500 mt-2">EXTRA FORMAT</div>
                    </div>

                    {/* Size Indicators */}
                    <div className="absolute -bottom-8 left-0 w-full text-center text-xs text-stone-500 font-mono">{width}mm</div>
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-xs text-stone-500 font-mono rotate-90">{height}mm</div>
                </div>
            </div>

            {/* Control Deck - Dual Horizontal Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-stone-950 p-6 rounded-sm border border-stone-800">
                {/* Width Control */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-stone-400 font-bold tracking-wider uppercase">
                        <span className="flex items-center gap-2"><MoveHorizontal size={16} /> {t('formats.config.width')}</span>
                        <span className="text-nobel-gold">{width} mm</span>
                    </div>
                    <input 
                        type="range" 
                        min={MIN_W} 
                        max={MAX_W} 
                        value={width}
                        onChange={(e) => setWidth(parseInt(e.target.value))}
                        className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-nobel-gold"
                        style={{ touchAction: 'none' }}
                    />
                    <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                        <span>{MIN_W}</span>
                        <span>{MAX_W}</span>
                    </div>
                </div>

                {/* Height Control */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-stone-400 font-bold tracking-wider uppercase">
                        <span className="flex items-center gap-2"><MoveVertical size={16} /> {t('formats.config.height')}</span>
                        <span className="text-nobel-gold">{height} mm</span>
                    </div>
                    <input 
                        type="range" 
                        min={MIN_H} 
                        max={MAX_H} 
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-nobel-gold"
                        style={{ touchAction: 'none' }}
                    />
                    <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                        <span>{MIN_H}</span>
                        <span>{MAX_H}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 4. MAXI SPECS: TECHNICAL BLUEPRINT ---

export const MaxiSpecsDiagram: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <SpecCard 
                icon={<Ruler className="text-nobel-gold" size={24} />} 
                label={t('formats.specs.spine.label')} 
                value="80mm" 
                sub={t('formats.specs.spine.sub')}
            />
             <SpecCard 
                icon={<Weight className="text-nobel-gold" size={24} />} 
                label={t('formats.specs.weight.label')}
                value="12kg" 
                sub={t('formats.specs.weight.sub')}
            />
             <SpecCard 
                icon={<Layers className="text-nobel-gold" size={24} />} 
                label={t('formats.specs.caliper.label')}
                value="5mm" 
                sub={t('formats.specs.caliper.sub')}
            />
             <SpecCard 
                icon={<BoxSelect className="text-nobel-gold" size={24} />} 
                label={t('formats.specs.min.label')}
                value="100x150" 
                sub={t('formats.specs.min.sub')}
            />
        </div>
    );
}

const SpecCard = ({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) => (
    <div className="group p-6 bg-stone-800/50 border border-stone-700 hover:border-nobel-gold transition-colors">
        <div className="flex items-center justify-between mb-4">
            {icon}
            <div className="text-3xl font-mono text-white font-bold">{value}</div>
        </div>
        <div className="text-sm text-stone-400 font-bold uppercase tracking-wider mb-2">{label}</div>
        <div className="text-xs text-stone-600">{sub}</div>
    </div>
)

// --- 5. BINDING TYPES SHOWCASE: IMMERSIVE INTERACTIVE SELECTOR ---

const bindingTypeKeys = ['perfect', 'swiss', 'bodonian', 'halfleather', 'leporello', 'octavius'] as const;
type BindingTypeKey = typeof bindingTypeKeys[number];

// 3D Book Model for each binding type
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
                // Swiss binding: simple open hardcover, block on RIGHT side
                return (
                    <group ref={groupRef} rotation={[0, 0.2, 0]}>
                        {/* Left Cover - empty, no block */}
                        <mesh position={[-0.95, 0, 0]}>
                            <boxGeometry args={[1.8, 2.6, 0.05]} />
                            <meshStandardMaterial color="#4a5568" roughness={0.4} />
                        </mesh>
                        {/* Right Cover - with block attached */}
                        <mesh position={[0.95, 0, 0]}>
                            <boxGeometry args={[1.8, 2.6, 0.05]} />
                            <meshStandardMaterial color="#4a5568" roughness={0.4} />
                        </mesh>
                        {/* Book Block - on RIGHT cover */}
                        <mesh position={[0.95, 0, 0.17]}>
                            <boxGeometry args={[1.65, 2.45, 0.25]} />
                            <meshStandardMaterial color="#F5F4F0" roughness={0.8} />
                        </mesh>
                    </group>
                );
            
            case 'bodonian':
                // Bodonian: 2-piece cover, spine separate and recessed, gauze visible
                return (
                    <group ref={groupRef}>
                        {/* Back Cover - separate piece, slightly raised */}
                        <mesh position={[0.05, 0, -0.16]}>
                            <boxGeometry args={[1.75, 2.6, 0.06]} />
                            <meshStandardMaterial color="#5c4033" roughness={0.5} />
                        </mesh>
                        {/* Book Block */}
                        <mesh position={[0.05, 0, 0]}>
                            <boxGeometry args={[1.7, 2.5, 0.22]} />
                            <meshStandardMaterial color="#EBE9E4" roughness={0.8} />
                        </mesh>
                        {/* Spine area - recessed, with gauze fabric */}
                        <mesh position={[-0.85, 0, 0]}>
                            <boxGeometry args={[0.12, 2.5, 0.24]} />
                            <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
                        </mesh>
                        {/* Gauze texture lines */}
                        {[...Array(8)].map((_, i) => (
                            <mesh key={i} position={[-0.85, -1.1 + i * 0.32, 0.13]}>
                                <boxGeometry args={[0.13, 0.02, 0.01]} />
                                <meshStandardMaterial color="#b8a888" roughness={0.8} />
                            </mesh>
                        ))}
                        {/* Front Cover - separate piece, raised above spine */}
                        <group ref={coverRef} position={[-0.78, 0, 0.14]}>
                            <mesh position={[0.88, 0, 0]}>
                                <boxGeometry args={[1.75, 2.6, 0.06]} />
                                <meshStandardMaterial color="#5c4033" roughness={0.5} />
                            </mesh>
                        </group>
                    </group>
                );
            
            case 'halfleather':
                // Half binding: leather spine on both covers
                return (
                    <group ref={groupRef}>
                        {/* Back Cover - paper/cloth part */}
                        <mesh position={[0.15, 0, -0.13]}>
                            <boxGeometry args={[1.5, 2.6, 0.04]} />
                            <meshStandardMaterial color="#8b7355" roughness={0.8} />
                        </mesh>
                        {/* Back Cover - leather spine part */}
                        <mesh position={[-0.78, 0, -0.13]}>
                            <boxGeometry args={[0.35, 2.6, 0.045]} />
                            <meshStandardMaterial color="#5c3d2e" roughness={0.4} />
                        </mesh>
                        {/* Leather Spine */}
                        <mesh position={[-0.92, 0, 0]}>
                            <boxGeometry args={[0.12, 2.6, 0.3]} />
                            <meshStandardMaterial color="#5c3d2e" roughness={0.4} />
                        </mesh>
                        {/* Book Block */}
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[1.7, 2.5, 0.2]} />
                            <meshStandardMaterial color="#EBE9E4" roughness={0.8} />
                        </mesh>
                        {/* Front Cover */}
                        <group ref={coverRef} position={[-0.92, 0, 0.13]}>
                            {/* Paper/cloth part */}
                            <mesh position={[1.07, 0, 0]}>
                                <boxGeometry args={[1.5, 2.6, 0.04]} />
                                <meshStandardMaterial color="#8b7355" roughness={0.8} />
                            </mesh>
                            {/* Leather spine part on front */}
                            <mesh position={[0.14, 0, 0]}>
                                <boxGeometry args={[0.35, 2.6, 0.045]} />
                                <meshStandardMaterial color="#5c3d2e" roughness={0.4} />
                            </mesh>
                        </group>
                    </group>
                );
            
            case 'leporello':
                // Leporello: accordion fold, tighter spacing
                return (
                    <group ref={groupRef}>
                        {/* Left cover */}
                        <mesh position={[-1.2, 0, 0]}>
                            <boxGeometry args={[0.06, 2.5, 1.6]} />
                            <meshStandardMaterial color="#3d4852" roughness={0.3} />
                        </mesh>
                        {/* Accordion folds - tighter spacing */}
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
                        {/* Right cover */}
                        <mesh position={[1.0, 0, 0]}>
                            <boxGeometry args={[0.06, 2.5, 1.6]} />
                            <meshStandardMaterial color="#3d4852" roughness={0.3} />
                        </mesh>
                    </group>
                );
            
            case 'octavius':
                // Octavius: V-shape open book with gatefolds
                return (
                    <group ref={groupRef} rotation={[0.3, 0.15, 0]}>
                        {/* Left Cover - pivots from spine edge */}
                        <mesh position={[-0.8, 0, -0.25]} rotation={[0, 0.35, 0]}>
                            <boxGeometry args={[1.6, 2.5, 0.04]} />
                            <meshStandardMaterial color="#2d3748" roughness={0.4} />
                        </mesh>
                        {/* Right Cover - pivots from spine edge */}
                        <mesh position={[0.8, 0, -0.25]} rotation={[0, -0.35, 0]}>
                            <boxGeometry args={[1.6, 2.5, 0.04]} />
                            <meshStandardMaterial color="#2d3748" roughness={0.4} />
                        </mesh>
                        {/* Pages on left - following cover angle */}
                        <mesh position={[-0.65, 0, -0.15]} rotation={[0, 0.3, 0]}>
                            <boxGeometry args={[1.4, 2.4, 0.08]} />
                            <meshStandardMaterial color="#EBE9E4" roughness={0.8} />
                        </mesh>
                        {/* Pages on right - following cover angle */}
                        <mesh position={[0.65, 0, -0.15]} rotation={[0, -0.3, 0]}>
                            <boxGeometry args={[1.4, 2.4, 0.05]} />
                            <meshStandardMaterial color="#F5F4F0" roughness={0.9} />
                        </mesh>
                        {/* Gatefold from left - extending outward */}
                        <mesh position={[-1.5, 0, 0.25]} rotation={[0, 0.7, 0]}>
                            <boxGeometry args={[1.1, 2.3, 0.01]} />
                            <meshStandardMaterial color="#FAFAF8" roughness={0.9} side={THREE.DoubleSide} />
                        </mesh>
                        {/* Gatefold from right - extending outward */}
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

// Compact binding type button
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
        <button
            onClick={onClick}
            className={`w-full text-left px-4 py-4 border-l-2 transition-all duration-300 ${
                isSelected 
                    ? 'border-nobel-gold bg-stone-800/50 pl-5' 
                    : 'border-stone-700 hover:border-stone-500 hover:bg-stone-800/30'
            }`}
        >
            <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                isSelected ? 'text-nobel-gold' : 'text-white'
            }`}>
                {t(`bindings.types.${typeKey}.name`)}
            </span>
            <p className="text-xs text-stone-500 mt-1">
                {t(`bindings.types.${typeKey}.tagline`)}
            </p>
        </button>
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
                        <div className="space-y-1">
                            <div className="text-xs text-stone-500 font-bold uppercase tracking-widest">{t('bindings.specs_labels.method')}</div>
                            <div className="text-white text-sm">{t(`bindings.types.${selectedType}.specs.method`)}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-stone-500 font-bold uppercase tracking-widest">{t('bindings.specs_labels.spine')}</div>
                            <div className="text-white text-sm">{t(`bindings.types.${selectedType}.specs.spine`)}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-stone-500 font-bold uppercase tracking-widest">{t('bindings.specs_labels.durability')}</div>
                            <div className="text-nobel-gold text-sm">{t(`bindings.types.${selectedType}.specs.durability`)}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-stone-500 font-bold uppercase tracking-widest">{t('bindings.specs_labels.ideal')}</div>
                            <div className="text-white text-sm">{t(`bindings.types.${selectedType}.specs.ideal`)}</div>
                        </div>
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
                
                {/* Info Overlay - Bottom - pointer-events-none to not interfere with 3D */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none select-none">
                    <motion.div
                        key={selectedType}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="text-nobel-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
                            {t(`bindings.types.${selectedType}.tagline`)}
                        </div>
                        <h3 className="font-serif text-3xl text-white mb-3">
                            {t(`bindings.types.${selectedType}.name`)}
                        </h3>
                        <p className="text-stone-400 text-base max-w-lg leading-relaxed">
                            {t(`bindings.types.${selectedType}.desc`)}
                        </p>
                    </motion.div>
                </div>
                
                {/* Hint - pointer-events-none */}
                <div className="absolute top-4 right-4 flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-widest pointer-events-none select-none">
                    <MousePointer2 size={12} />
                    <span>{t('bindings.hint')}</span>
                </div>
            </div>
        </div>
    );
};