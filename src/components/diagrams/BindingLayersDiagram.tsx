/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionLabel, Headline, Body } from '../Typography';

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
                            {[1, 2].map(i => (
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
                            {[1, 2, 3, 4, 5].map(i => (
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
