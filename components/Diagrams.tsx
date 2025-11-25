/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, CheckCircle2, Ruler, BoxSelect, Weight, Layers, MoveHorizontal, MoveVertical, MousePointer2 } from 'lucide-react';
import { SectionLabel, Headline, Subtitle, Body, SpecItem, ListItemButton } from './Typography';

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
             <SectionLabel>{t('process.cycle')}</SectionLabel>
             <Headline as="h3" size="sm" className="mt-2">{steps[activeStep].label}</Headline>
             <Body size="sm" className="mt-3 h-12">{steps[activeStep].desc}</Body>
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


// --- 2. SCHEMATIC BOOK ANATOMY: TECHNICAL BLUEPRINT ---

type AnatomyPartKey = 'cover' | 'spine' | 'headband' | 'endpapers' | 'block' | 'ribbon' | 'hinge';

interface PartConfig {
  id: AnatomyPartKey;
  path: string;
  anchorX: number;
  anchorY: number;
}

// All 7 book anatomy parts
const PART_CONFIGS: PartConfig[] = [
  { id: 'cover', path: 'M40,30 L260,30 L260,370 L40,370 Z', anchorX: 260, anchorY: 70 },
  { id: 'spine', path: 'M20,30 L40,30 L40,370 L20,370 Z', anchorX: 20, anchorY: 200 },
  { id: 'headband', path: 'M20,30 L40,30 L40,48 L20,48 Z', anchorX: 30, anchorY: 39 },
  { id: 'block', path: 'M50,45 L250,45 L250,355 L50,355 Z', anchorX: 250, anchorY: 300 },
  { id: 'endpapers', path: 'M50,45 L80,45 L80,355 L50,355 Z', anchorX: 65, anchorY: 200 },
  { id: 'ribbon', path: 'M28,48 L32,48 L32,390 L28,390 Z', anchorX: 30, anchorY: 370 },
  { id: 'hinge', path: 'M40,45 L50,45 L50,355 L40,355 Z', anchorX: 45, anchorY: 150 },
];

export const BookAnatomyDiagram: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPart, setSelectedPart] = useState<AnatomyPartKey | null>(null);
  
  const parts = useMemo(() => PART_CONFIGS.map(config => ({
    ...config,
    label: t(`anatomy.parts.${config.id}.label`),
    desc: t(`anatomy.parts.${config.id}.desc`),
    spec: t(`anatomy.parts.${config.id}.spec`),
  })), [t]);

  const selectedPartData = selectedPart ? parts.find(p => p.id === selectedPart) : null;

  return (
    <div className="flex flex-col gap-4 mt-6">
      
      {/* Schematic Visualizer */}
      <div className="w-full h-[320px] sm:h-[380px] bg-[#F5F4F0] border border-stone-200 relative flex items-center justify-center overflow-hidden rounded-sm">
        
        {/* SVG Schematic */}
        <svg 
          viewBox="0 0 300 420" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Book shadow */}
          <rect x={25} y={35} width={245} height={345} fill="#d6d3d1" opacity={0.2} rx={2} />
          
          {/* Interactive parts */}
          {parts.map((part) => (
            <motion.path
              key={part.id}
              d={part.path}
              fill={selectedPart === part.id ? 'rgba(197, 160, 89, 0.35)' : '#ffffff'}
              stroke={selectedPart === part.id ? '#C5A059' : '#a8a29e'}
              strokeWidth={selectedPart === part.id ? 2.5 : 1}
              className="cursor-pointer"
              onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
              whileHover={{ fill: 'rgba(197, 160, 89, 0.2)' }}
              transition={{ duration: 0.2 }}
            />
          ))}
          
          {/* Page lines inside block */}
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1={100 + i * 28} y1={55}
              x2={100 + i * 28} y2={345}
              stroke="#e7e5e4"
              strokeWidth={1}
            />
          ))}
          
          {/* Ribbon end detail */}
          <path d="M28,390 L30,405 L32,390" fill="none" stroke="#C5A059" strokeWidth={1.5} opacity={0.7} />
          
          {/* Headband stripes - top */}
          <line x1={22} y1={35} x2={38} y2={35} stroke="#C5A059" strokeWidth={1} opacity={0.6} />
          <line x1={22} y1={40} x2={38} y2={40} stroke="#C5A059" strokeWidth={1} opacity={0.6} />
          
          {/* Headband stripes - bottom */}
          <line x1={22} y1={365} x2={38} y2={365} stroke="#C5A059" strokeWidth={1} opacity={0.6} />
          <line x1={22} y1={360} x2={38} y2={360} stroke="#C5A059" strokeWidth={1} opacity={0.6} />
          
          {/* Anchor indicator when part selected */}
          {selectedPart && (
            <motion.circle
              cx={parts.find(p => p.id === selectedPart)?.anchorX}
              cy={parts.find(p => p.id === selectedPart)?.anchorY}
              r={8}
              fill="#C5A059"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </svg>
        
        {/* Selected part info overlay */}
        {selectedPartData && (
          <motion.div 
            className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-[200px] bg-white/95 backdrop-blur-sm p-3 rounded-sm border border-stone-200 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm font-bold text-stone-900 mb-1">{selectedPartData.label}</div>
            <Body size="sm" className="text-xs">{selectedPartData.desc}</Body>
          </motion.div>
        )}
        
        {/* Hint */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-stone-200 shadow-sm flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">
            <MousePointer2 size={12} />
            <span>{t('anatomy.hint')}</span>
          </div>
        </div>
      </div>
      
      {/* Parts Grid - 2 rows of buttons */}
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
        {parts.map((part) => (
          <button
            key={part.id}
            onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
            className={`flex flex-col items-center text-center p-2 sm:p-3 rounded-sm border transition-all duration-300 ${
              selectedPart === part.id 
                ? 'bg-stone-50 border-nobel-gold' 
                : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <div className={`w-2 h-2 rounded-full mb-2 transition-colors ${
              selectedPart === part.id ? 'bg-nobel-gold' : 'bg-stone-300'
            }`} />
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-tight transition-colors ${
              selectedPart === part.id ? 'text-stone-900' : 'text-stone-500'
            }`}>
              {part.label}
            </span>
          </button>
        ))}
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
        <ListItemButton
            isActive={isSelected}
            onClick={onClick}
            variant="light"
        >
            <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                isSelected ? 'text-nobel-gold' : 'text-white'
            }`}>
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
                
                {/* Info Overlay - Bottom - pointer-events-none to not interfere with 3D */}
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
                
                {/* Hint - pointer-events-none */}
                <div className="absolute top-4 right-4 flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-widest pointer-events-none select-none">
                    <MousePointer2 size={12} />
                    <span>{t('bindings.hint')}</span>
                </div>
            </div>
        </div>
    );
};