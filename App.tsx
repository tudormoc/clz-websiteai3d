
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene } from './components/QuantumScene';
import { BindingLayersDiagram, FormatComparisonDiagram, BookAnatomyDiagram, MaxiSpecsDiagram } from './components/Diagrams';
import { LegacySection, SelectedWorks, GlobalReach } from './components/Sections';
import { ArrowDown, Menu, X, Mail, ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, sub, delay }: { title: string, sub: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-sm border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-500 w-full max-w-xs hover:border-nobel-gold" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3 italic">{title}</h3>
      <div className="w-8 h-0.5 bg-nobel-gold mb-4 opacity-60 group-hover:w-24 transition-all duration-500"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{sub}</p>
    </div>
  );
};

// --- PAGES ---

const HomePage: React.FC<{ onNavigate: (page: string, section?: string) => void }> = ({ onNavigate }) => (
  <>
    {/* Hero Section */}
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-100">
        <HeroScene />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.0)_0%,rgba(249,248,244,0.5)_60%,rgba(249,248,244,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1 border border-stone-300 text-stone-500 text-[10px] tracking-[0.3em] uppercase font-bold backdrop-blur-sm bg-white/40">
            Est. 1963 • Padova, Italy
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium leading-tight mb-8 text-stone-900 drop-shadow-sm">
            Cooperativa <br/>
            <span className="text-4xl md:text-6xl lg:text-7xl block mt-2 text-stone-800">Lavoratori Zanardi</span>
          </h1>
          <div className="w-24 h-1 bg-nobel-gold mx-auto mb-8"></div>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-stone-600 font-serif italic leading-relaxed mb-12">
            The industrial atelier for prestige publishing. <br/>Specializing in maxi formats and bespoke hardcovers.
          </p>
          
          <div className="flex justify-center">
             <button onClick={() => onNavigate('home', 'intro')} className="group flex flex-col items-center gap-2 text-xs font-bold tracking-widest text-stone-400 hover:text-nobel-gold transition-colors cursor-pointer uppercase">
                <span>Discover the Craft</span>
                <span className="p-3 border border-stone-200 rounded-full group-hover:border-nobel-gold transition-colors bg-white">
                    <ArrowDown size={16} />
                </span>
             </button>
          </div>
        </div>
    </header>

    {/* Introduction / Brand Overview */}
    <section id="intro" className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 relative">
                <div className="w-full aspect-[3/4] bg-stone-900 relative p-8 flex items-center justify-center border-4 border-double border-stone-700">
                    <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-nobel-gold opacity-50"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-nobel-gold opacity-50"></div>
                    <h3 className="text-white font-serif text-5xl text-center leading-snug">
                        <span className="text-nobel-gold italic block text-2xl mb-2">Art of the</span>
                        Hardcover
                    </h3>
                </div>
            </div>
            <div className="md:col-span-7 text-lg text-stone-600 leading-relaxed space-y-8">
              <div>
                  <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">The Atelier</div>
                  <h2 className="font-serif text-5xl mb-6 leading-tight text-stone-900">Industrial Soul,<br/>Artisan Heart.</h2>
              </div>
              <p>
                <span className="text-6xl float-left mr-3 mt-[-12px] font-serif text-stone-300">W</span>e do not sell books; we construct them. Operating from Padova, CLZ serves an international clientele of museums, art galleries, and luxury publishers.
              </p>
              <p>
                We focus exclusively on <strong>Cardboard / Hardcover</strong> binding ("Cartonato"). We do not produce softcovers or brochures. Our facility merges heavy industrial precision with the delicate touch required for <strong className="text-stone-900">Maxi Extra</strong> formats and heavy-board limited editions.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                  <div className="px-4 py-3 bg-stone-50 border border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">Case Binding</div>
                  <div className="px-4 py-3 bg-stone-50 border border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">Smyth Sewn</div>
                  <div className="px-4 py-3 bg-stone-50 border border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">Quality Control</div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => onNavigate('atelier')} 
                  className="inline-flex items-center gap-2 text-stone-900 border-b border-stone-900 pb-1 hover:text-nobel-gold hover:border-nobel-gold transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  Enter The Laboratory <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
    </section>

    <LegacySection />
    <SelectedWorks />
    <GlobalReach />
  </>
);

const AtelierPage: React.FC = () => (
  <div className="animate-fade-in">
    {/* Atelier Header */}
    <div className="pt-40 pb-20 bg-stone-900 text-stone-200 text-center">
        <div className="container mx-auto px-6">
            <div className="inline-block mb-4 px-3 py-1 border border-stone-700 rounded-full text-[10px] uppercase tracking-widest text-nobel-gold">Technical Laboratory</div>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">The Science of Binding</h1>
            <p className="max-w-2xl mx-auto text-stone-400 text-lg font-serif italic">
                Where industrial precision meets the integrity of materials.
            </p>
        </div>
    </div>

    {/* Process Section */}
    <section id="process" className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
                <div className="mb-16 max-w-2xl">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">Process</div>
                <h2 className="font-serif text-4xl text-stone-900 mb-6">From Sheet to Shelf</h2>
                <p className="text-stone-600">Explore the layers of a CLZ hardcover production.</p>
                </div>
                <BindingLayersDiagram />
        </div>
    </section>

    {/* Anatomy Section */}
    <section id="anatomy" className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">Anatomy</div>
                    <h2 className="font-serif text-4xl text-stone-900 mb-6">Constructed for Eternity</h2>
                    <BookAnatomyDiagram />
                    </div>
                    <div className="flex flex-col justify-center space-y-8">
                    <p className="text-lg text-stone-600 leading-relaxed">
                        Every component is selected for archival quality and structural integrity. 
                        From the density of the greyboard to the direction of the paper grain, nothing is left to chance.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                        <ServiceCard title="Materials" sub="Premium Sourcing" delay="0s" />
                        <ServiceCard title="Precision" sub="1/10mm Tolerance" delay="0.1s" />
                    </div>
                    </div>
            </div>
        </div>
    </section>

    {/* Formats Section */}
    <section id="formats" className="py-24 bg-stone-900 text-stone-200">
            <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">Capabilities</div>
                <h2 className="font-serif text-5xl text-white mb-6">Maxi Formats</h2>
                <p className="max-w-2xl mx-auto text-stone-400">Pushing the boundaries of industrial bookbinding.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <FormatComparisonDiagram />
                    <div className="flex flex-col justify-center">
                        <h3 className="font-serif text-3xl mb-6 text-white italic">No Compromise on Size.</h3>
                        <p className="text-stone-400 mb-8 leading-relaxed">
                            While standard binders stop at 30x30cm, CLZ begins where others finish. 
                            Our specialized XL lines handle formats up to 435mm x 605mm in industrial runs.
                        </p>
                        <MaxiSpecsDiagram />
                    </div>
            </div>
            </div>
    </section>
  </div>
);

// --- MAIN APP ---

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'atelier'>('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple Router Logic
  const navigateTo = (page: 'home' | 'atelier', sectionId?: string) => {
    setMenuOpen(false);
    
    // If we are changing pages, scroll to top first unless section provided
    if (page !== activePage) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setActivePage(page);
    }

    // Handle deep linking to section after render
    if (sectionId) {
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }, 100);
    } else if (page === activePage) {
        // If same page and no section, scroll top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#F9F8F4]/95 backdrop-blur-md shadow-sm py-4 border-b border-stone-200' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 border-2 border-nobel-gold flex items-center justify-center text-nobel-gold font-serif font-bold text-xl shadow-sm bg-stone-900">C</div>
            <div className="flex flex-col">
                <span className={`font-serif font-bold text-lg tracking-widest transition-opacity text-stone-900 leading-none`}>
                CLZ
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Padova • Italia</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold tracking-[0.15em] text-stone-600 uppercase">
            {/* Home Links */}
            <button onClick={() => navigateTo('home', 'intro')} className={`hover:text-nobel-gold transition-colors ${activePage === 'home' ? 'text-stone-900' : ''}`}>The Brand</button>
            <button onClick={() => navigateTo('home', 'legacy')} className="hover:text-nobel-gold transition-colors">Legacy</button>
            <button onClick={() => navigateTo('home', 'works')} className="hover:text-nobel-gold transition-colors">Works</button>
            
            <span className="text-stone-300">|</span>

            {/* Atelier Links */}
            <button onClick={() => navigateTo('atelier')} className={`hover:text-nobel-gold transition-colors ${activePage === 'atelier' ? 'text-nobel-gold' : ''}`}>The Atelier</button>
            <button onClick={() => navigateTo('atelier', 'process')} className="hover:text-nobel-gold transition-colors">Process</button>
            <button onClick={() => navigateTo('atelier', 'formats')} className="hover:text-nobel-gold transition-colors">Maxi Formats</button>

            <a href="mailto:info@clz.it" className="flex items-center gap-2 px-5 py-2 bg-stone-900 text-white hover:bg-nobel-gold transition-colors shadow-sm cursor-pointer ml-4">
              <Mail size={14} />
              Contact
            </a>
          </div>

          <button className="lg:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-2xl font-serif animate-fade-in text-stone-900">
            <button onClick={() => navigateTo('home', 'intro')}>The Brand</button>
            <button onClick={() => navigateTo('home', 'works')}>Works</button>
            <button onClick={() => navigateTo('atelier')}>The Atelier</button>
            <button onClick={() => navigateTo('atelier', 'process')}>Technical Process</button>
            <button onClick={() => navigateTo('atelier', 'formats')}>Maxi Formats</button>
            <a href="mailto:info@clz.it" className="px-6 py-3 bg-stone-900 text-white shadow-lg cursor-pointer flex items-center gap-2">
               <Mail size={18} /> Contact Us
            </a>
        </div>
      )}

      <main>
          {activePage === 'home' ? <HomePage onNavigate={navigateTo} /> : <AtelierPage />}
      </main>

      <footer className="bg-stone-950 py-12 border-t border-stone-900 text-center">
           <div className="container mx-auto px-6">
               <div className="text-nobel-gold font-serif font-bold text-2xl mb-4">CLZ</div>
               <p className="text-stone-600 text-xs tracking-widest uppercase mb-6">&copy; {new Date().getFullYear()} Cooperativa Lavoratori Zanardi. Padova, Italy.</p>
               <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-stone-500">
                  <a href="#" className="hover:text-white transition-colors">Legal</a>
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Credits</a>
               </div>
           </div>
      </footer>
    </div>
  );
};

export default App;
