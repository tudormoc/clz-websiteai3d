
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Building2, BookOpen, Layers, Scan, Fingerprint, Plus } from 'lucide-react';

// --- LEGACY SECTION ---
export const LegacySection = () => {
  return (
    <section id="legacy" className="py-24 bg-stone-900 text-stone-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-stone-800/20 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
           <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">Our History</div>
           <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
             Half a Century of <br/>
             <span className="italic text-stone-500">Bindery Excellence</span>
           </h2>
           <div className="space-y-6 text-stone-400 leading-relaxed text-lg">
             <p>
               Founded in 1963 in the heart of the Veneto region, CLZ began as a traditional artisan collective. Over the decades, we have evolved into a premier industrial partner for the world's most demanding publishers.
             </p>
             <p>
               We successfully bridged the gap between <strong className="text-white">hand-craftsmanship</strong> and <strong className="text-white">industrial scale</strong>. Today, our facility in Padova houses unique machinery capable of handling formats and materials that standard binderies simply cannot touch.
             </p>
           </div>
           
           <div className="mt-12 grid grid-cols-3 gap-6 border-t border-stone-800 pt-8">
              <div>
                <div className="text-3xl font-serif text-nobel-gold">1963</div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">Established</div>
              </div>
              <div>
                <div className="text-3xl font-serif text-nobel-gold">4M+</div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">Books / Year</div>
              </div>
              <div>
                <div className="text-3xl font-serif text-nobel-gold">55</div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">Master Artisans</div>
              </div>
           </div>
        </div>
        <div className="relative h-[500px] border border-stone-800 bg-stone-950 p-8 flex items-center justify-center">
            {/* Abstract representation of history/archive */}
            <div className="absolute inset-4 border border-stone-800"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(197,160,89,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
            <div className="text-center z-10">
                <div className="text-6xl font-serif italic text-stone-800 mb-2">Since</div>
                <div className="text-8xl font-bold text-stone-800">1963</div>
            </div>
        </div>
      </div>
    </section>
  );
};

// --- PROJECTS / WORKS SECTION ---

// Helper for generating artistic covers with CSS
const CoverArt = ({ style, title }: { style: string, title: string }) => {
    // Shared foil effect class
    const foilText = "text-transparent bg-clip-text bg-gradient-to-br from-[#C5A059] via-[#E6Cfa0] to-[#997b3a] bg-[length:200%_200%] animate-shimmer";

    switch(style) {
        case 'minimal':
            return (
                <div className="absolute inset-0 bg-[#EBE9E4] p-6 flex flex-col justify-between">
                    <div className="w-12 h-1 bg-stone-900"></div>
                    <h3 className={`font-serif text-4xl leading-none tracking-tighter text-stone-900 mix-blend-multiply`}>{title}</h3>
                    <div className="text-[9px] font-mono tracking-widest text-stone-500 uppercase">Fig. 01</div>
                </div>
            )
        case 'swiss':
             return (
                <div className="absolute inset-0 bg-[#D32F2F] p-6 grid grid-rows-3">
                    <div className="row-span-2 border-b-2 border-white/20 flex items-end pb-4">
                         <h3 className="font-sans text-5xl font-bold text-white tracking-tighter leading-none transform -rotate-90 origin-bottom-left translate-x-8">{title}</h3>
                    </div>
                    <div className="pt-4 flex justify-between text-white/60 font-mono text-[10px]">
                        <span>EDITION</span>
                        <span>2024</span>
                    </div>
                </div>
            )
        case 'bauhaus':
            return (
                <div className="absolute inset-0 bg-[#E0DCD3] overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-stone-800 rounded-bl-full mix-blend-multiply opacity-90"></div>
                    <div className="absolute bottom-12 left-8 w-24 h-24 bg-[#C5A059] rounded-full mix-blend-multiply opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className={`font-serif italic text-3xl text-stone-900 z-10 relative`}>{title}</h3>
                    </div>
                </div>
            )
        case 'photo':
             return (
                <div className="absolute inset-0 bg-stone-900 flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-4 border border-stone-700"></div>
                     <div className="w-32 h-32 rounded-full border border-stone-600 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-tr from-stone-800 to-stone-700 rounded-full"></div>
                     </div>
                     <h3 className={`absolute bottom-8 text-center font-serif text-2xl ${foilText}`}>{title}</h3>
                </div>
            )
        default: 
            return <div className="bg-white inset-0 absolute"></div>
    }
}

interface ProjectProps {
    category: string;
    title: string;
    client: string;
    year: string;
    specs: { label: string, value: string }[];
    style: string;
    spineColor: string;
}

const ProjectShowcase = ({ category, title, client, year, specs, style, spineColor }: ProjectProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group w-full flex flex-col gap-6"
    >
        {/* 3D Book Container */}
        <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] xl:aspect-[3/4] perspective-1000 cursor-pointer">
            
            {/* The Book */}
            <div className="absolute inset-10 md:inset-16 transition-all duration-700 ease-out transform-style-3d group-hover:rotate-y-[-25deg] group-hover:rotate-x-[10deg] group-hover:translate-x-4 group-hover:-translate-y-4">
                
                {/* Front Cover */}
                <div className="absolute inset-0 backface-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-500 overflow-hidden rounded-[2px]">
                    <CoverArt style={style} title={title} />
                    
                    {/* Texture Overlays */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/linen.png')] mix-blend-multiply pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/10 pointer-events-none"></div>
                    
                    {/* Lighting Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                </div>

                {/* Spine (Visible on rotate) */}
                <div 
                    className={`absolute top-0 bottom-0 left-0 w-8 origin-left rotate-y-90 ${spineColor} flex flex-col justify-end pb-8 items-center backface-hidden shadow-inner`}
                    style={{ transform: 'rotateY(-90deg) translateX(-32px)' }} 
                >
                    <span className="text-[8px] tracking-widest text-white/80 font-mono uppercase rotate-90 whitespace-nowrap">{client} • {year}</span>
                </div>

                {/* Book Block / Pages (Side) */}
                <div 
                    className="absolute top-2 bottom-2 right-0 w-6 bg-[#F5F4F0] origin-right rotate-y-90 backface-hidden"
                    style={{ transform: 'rotateY(90deg) translateZ(0px) translateX(0px)' }}
                >
                    {/* Page lines texture */}
                    <div className="h-full w-full bg-[repeating-linear-gradient(transparent,transparent_2px,#e5e5e5_3px)]"></div>
                </div>
                 
                 {/* Shadow */}
                 <div className="absolute -bottom-8 left-4 right-4 h-8 bg-black/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-z-[-50px]"></div>

            </div>
        </div>

        {/* Spec Sheet / Details */}
        <div className="border-t border-stone-200 pt-4 group-hover:border-nobel-gold transition-colors duration-500">
            <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-serif text-2xl text-stone-900 group-hover:text-nobel-gold transition-colors">{title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">{year}</span>
            </div>
            <p className="text-sm font-serif italic text-stone-500 mb-4">{client}</p>
            
            <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                {specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] uppercase tracking-wider border-b border-stone-100 pb-1">
                        <span className="text-stone-400">{spec.label}</span>
                        <span className="font-bold text-stone-700">{spec.value}</span>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-xs font-bold text-nobel-gold uppercase tracking-widest">
                <span>View Case Study</span>
                <ArrowRight size={12} />
            </div>
        </div>
    </motion.div>
  );
};

export const SelectedWorks = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Fine Art', 'Architecture', 'Commercial'];

  const projects = [
      {
          category: 'Fine Art',
          title: 'Venetian Masters',
          client: 'Guggenheim Museum',
          year: '2023',
          style: 'photo',
          spineColor: 'bg-stone-800',
          specs: [
              { label: 'Format', value: '300x400mm' },
              { label: 'Paper', value: 'Munken Lynx' },
              { label: 'Binding', value: 'Smyth Sewn' },
              { label: 'Finish', value: 'Foil Deboss' }
          ]
      },
      {
          category: 'Architecture',
          title: 'Concrete Forms',
          client: 'Taschen',
          year: '2024',
          style: 'swiss',
          spineColor: 'bg-[#B71C1C]',
          specs: [
              { label: 'Format', value: '240x300mm' },
              { label: 'Cover', value: 'Linen' },
              { label: 'Spine', value: 'Flat Back' },
              { label: 'Weight', value: '2.4kg' }
          ]
      },
      {
          category: 'Commercial',
          title: 'Prada Archive',
          client: 'Prada Foundation',
          year: '2022',
          style: 'minimal',
          spineColor: 'bg-stone-400',
          specs: [
              { label: 'Format', value: '210x297mm' },
              { label: 'Style', value: 'Exposed' },
              { label: 'Ink', value: 'Tritone' },
              { label: 'Run', value: '5,000' }
          ]
      },
      {
          category: 'Fine Art',
          title: 'Bauhaus 100',
          client: 'MOMA New York',
          year: '2023',
          style: 'bauhaus',
          spineColor: 'bg-[#C5A059]',
          specs: [
              { label: 'Format', value: '280x280mm' },
              { label: 'Board', value: '3mm Grey' },
              { label: 'Wrap', value: 'Silk' },
              { label: 'Detail', value: 'Tip-on' }
          ]
      }
  ];

  const filtered = activeTab === 'All' ? projects : projects.filter(p => p.category === activeTab);

  return (
    <section id="works" className="py-32 bg-[#fff]">
      <div className="container mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 pb-8 border-b border-stone-200">
            <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                     <span className="w-8 h-px bg-nobel-gold"></span>
                     <span className="text-xs font-bold tracking-widest text-nobel-gold uppercase">Selected Works</span>
                </div>
                <h2 className="font-serif text-5xl md:text-6xl text-stone-900 leading-none">
                    Curated <span className="italic text-stone-400">Archive</span>
                </h2>
            </div>

            <div className="flex gap-8 mt-8 md:mt-0">
                {tabs.map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-xs font-bold uppercase tracking-widest pb-2 transition-all duration-300 ${activeTab === tab ? 'text-stone-900 border-b-2 border-nobel-gold' : 'text-stone-400 hover:text-stone-600 border-b-2 border-transparent'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Project Grid - Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
            <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                    <ProjectShowcase key={project.title} {...project} />
                ))}
            </AnimatePresence>
        </div>

        <div className="mt-24 text-center">
            <button className="inline-flex items-center gap-2 text-stone-400 hover:text-nobel-gold transition-colors text-xs font-bold uppercase tracking-widest group">
                <Plus size={16} />
                <span>Load More Projects</span>
            </button>
        </div>

      </div>
    </section>
  );
};

// --- GLOBAL REACH SECTION ---
export const GlobalReach = () => {
    return (
        <section className="py-24 border-t border-stone-200 bg-stone-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl text-stone-900 mb-12 italic">Trusted by institutions across the globe</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder for Client Logos - Using Typography for now */}
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <Building2 size={32} className="text-stone-800 group-hover:text-nobel-gold transition-colors" />
                        <span className="font-serif font-bold text-lg">MUSEUMS</span>
                        <span className="text-[9px] uppercase tracking-widest text-stone-400">Archival Grade</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <BookOpen size={32} className="text-stone-800 group-hover:text-nobel-gold transition-colors" />
                        <span className="font-serif font-bold text-lg">PUBLISHERS</span>
                        <span className="text-[9px] uppercase tracking-widest text-stone-400">High Volume</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <Globe size={32} className="text-stone-800 group-hover:text-nobel-gold transition-colors" />
                        <span className="font-serif font-bold text-lg">GALLERIES</span>
                        <span className="text-[9px] uppercase tracking-widest text-stone-400">Limited Editions</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                         <div className="text-2xl font-serif font-bold border-2 border-stone-800 px-3 py-1 group-hover:border-nobel-gold group-hover:text-nobel-gold transition-colors">ISO 9001</div>
                        <span className="text-[10px] uppercase tracking-widest mt-1">Certified</span>
                    </div>
                </div>

                <div className="mt-16 pt-16 border-t border-stone-200 flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-stone-400">
                    <span>New York</span>
                    <span className="text-nobel-gold">•</span>
                    <span>London</span>
                    <span className="text-nobel-gold">•</span>
                    <span>Paris</span>
                    <span className="text-nobel-gold">•</span>
                    <span>Milan</span>
                    <span className="text-nobel-gold">•</span>
                    <span>Berlin</span>
                    <span className="text-nobel-gold">•</span>
                    <span>Tokyo</span>
                </div>
            </div>
        </section>
    )
}
