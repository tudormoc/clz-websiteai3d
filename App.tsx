/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { HeroScene } from './components/QuantumScene';
import { BindingLayersDiagram, FormatComparisonDiagram, BookAnatomyDiagram, MaxiSpecsDiagram } from './components/Diagrams';
import { LegacySection, SelectedWorks, GlobalReach } from './components/Sections';
import { ArrowDown, Menu, X, Mail, ArrowRight, Globe } from 'lucide-react';

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

const HomePage: React.FC<{ onNavigate: (page: string, section?: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  
  return (
  <>
    {/* Hero Section */}
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-100">
        <HeroScene />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.0)_0%,rgba(249,248,244,0.5)_60%,rgba(249,248,244,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1 border border-stone-300 text-stone-500 text-[10px] tracking-[0.3em] uppercase font-bold backdrop-blur-sm bg-white/40">
            {t('brand.est')}
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium leading-tight mb-8 text-stone-900 drop-shadow-sm">
            Cooperativa <br/>
            <span className="text-4xl md:text-6xl lg:text-7xl block mt-2 text-stone-800">Lavoratori Zanardi</span>
          </h1>
          <div className="w-24 h-1 bg-nobel-gold mx-auto mb-8"></div>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-stone-600 font-serif italic leading-relaxed mb-12 whitespace-pre-line">
            {t('brand.subtitle')}
          </p>
          
          <div className="flex justify-center">
             <button onClick={() => onNavigate('home', 'intro')} className="group flex flex-col items-center gap-2 text-xs font-bold tracking-widest text-stone-400 hover:text-nobel-gold transition-colors cursor-pointer uppercase">
                <span>{t('brand.discover')}</span>
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
                        <span className="text-nobel-gold italic block text-2xl mb-2">{t('intro.badge')}</span>
                        {t('intro.title_card')}
                    </h3>
                </div>
            </div>
            <div className="md:col-span-7 text-lg text-stone-600 leading-relaxed space-y-8">
              <div>
                  <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">{t('intro.label')}</div>
                  <h2 className="font-serif text-5xl mb-6 leading-tight text-stone-900 whitespace-pre-line">{t('intro.headline')}</h2>
              </div>
              <p>
                <Trans i18nKey="intro.p1" values={{ initial: 'W' }}>
                    <span className="text-6xl float-left mr-3 mt-[-12px] font-serif text-stone-300">W</span>e do not sell books; we construct them. Operating from Padova, CLZ serves an international clientele of museums, art galleries, and luxury publishers.
                </Trans>
              </p>
              <p>
                <Trans i18nKey="intro.p2">
                    We focus exclusively on <strong>Cardboard / Hardcover</strong> binding ("Cartonato"). We do not produce softcovers or brochures. Our facility merges heavy industrial precision with the delicate touch required for <strong className="text-stone-900">Maxi Extra</strong> formats and heavy-board limited editions.
                </Trans>
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                  <div className="px-4 py-3 bg-stone-50 border border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">{t('intro.tag_case')}</div>
                  <div className="px-4 py-3 bg-stone-50 border border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">{t('intro.tag_sewn')}</div>
                  <div className="px-4 py-3 bg-stone-50 border border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">{t('intro.tag_qc')}</div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => onNavigate('atelier')} 
                  className="inline-flex items-center gap-2 text-stone-900 border-b border-stone-900 pb-1 hover:text-nobel-gold hover:border-nobel-gold transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  {t('intro.enter')} <ArrowRight size={14} />
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
};

const AtelierPage: React.FC = () => {
  const { t } = useTranslation();
  return (
  <div className="animate-fade-in">
    {/* Atelier Header */}
    <div className="pt-40 pb-20 bg-stone-900 text-stone-200 text-center">
        <div className="container mx-auto px-6">
            <div className="inline-block mb-4 px-3 py-1 border border-stone-700 rounded-full text-[10px] uppercase tracking-widest text-nobel-gold">{t('atelier.label')}</div>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">{t('atelier.headline')}</h1>
            <p className="max-w-2xl mx-auto text-stone-400 text-lg font-serif italic">
                {t('atelier.sub')}
            </p>
        </div>
    </div>

    {/* Process Section */}
    <section id="process" className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
                <div className="mb-16 max-w-2xl">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">{t('process.label')}</div>
                <h2 className="font-serif text-4xl text-stone-900 mb-6">{t('process.headline')}</h2>
                <p className="text-stone-600">{t('process.sub')}</p>
                </div>
                <BindingLayersDiagram />
        </div>
    </section>

    {/* Anatomy Section */}
    <section id="anatomy" className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">{t('anatomy.label')}</div>
                    <h2 className="font-serif text-4xl text-stone-900 mb-6">{t('anatomy.headline')}</h2>
                    <BookAnatomyDiagram />
                    </div>
                    <div className="flex flex-col justify-center space-y-8">
                    <p className="text-lg text-stone-600 leading-relaxed">
                        {t('anatomy.desc')}
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                        <ServiceCard title={t('anatomy.cards.materials')} sub={t('anatomy.cards.sourcing')} delay="0s" />
                        <ServiceCard title={t('anatomy.cards.precision')} sub={t('anatomy.cards.tolerance')} delay="0.1s" />
                    </div>
                    </div>
            </div>
        </div>
    </section>

    {/* Formats Section */}
    <section id="formats" className="py-24 bg-stone-900 text-stone-200">
            <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">{t('formats.label')}</div>
                <h2 className="font-serif text-5xl text-white mb-6">{t('formats.headline')}</h2>
                <p className="max-w-2xl mx-auto text-stone-400">{t('formats.sub')}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <FormatComparisonDiagram />
                    <div className="flex flex-col justify-center">
                        <h3 className="font-serif text-3xl mb-6 text-white italic">{t('formats.text.headline')}</h3>
                        <p className="text-stone-400 mb-8 leading-relaxed">
                            {t('formats.text.p1')}
                        </p>
                        <MaxiSpecsDiagram />
                    </div>
            </div>
            </div>
    </section>
  </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'atelier'>('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

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

  const toggleLanguage = () => {
    const newLang = i18n.language === 'it' ? 'en' : 'it';
    i18n.changeLanguage(newLang);
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
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">{t('brand.location')}</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold tracking-[0.15em] text-stone-600 uppercase">
            {/* Home Links */}
            <button onClick={() => navigateTo('home', 'intro')} className={`hover:text-nobel-gold transition-colors ${activePage === 'home' ? 'text-stone-900' : ''}`}>{t('nav.brand')}</button>
            <button onClick={() => navigateTo('home', 'legacy')} className="hover:text-nobel-gold transition-colors">{t('nav.legacy')}</button>
            <button onClick={() => navigateTo('home', 'works')} className="hover:text-nobel-gold transition-colors">{t('nav.works')}</button>
            
            <span className="text-stone-300">|</span>

            {/* Atelier Links */}
            <button onClick={() => navigateTo('atelier')} className={`hover:text-nobel-gold transition-colors ${activePage === 'atelier' ? 'text-nobel-gold' : ''}`}>{t('nav.atelier')}</button>
            <button onClick={() => navigateTo('atelier', 'process')} className="hover:text-nobel-gold transition-colors">{t('nav.process')}</button>
            <button onClick={() => navigateTo('atelier', 'formats')} className="hover:text-nobel-gold transition-colors">{t('nav.formats')}</button>

            <a href="mailto:info@clz.it" className="flex items-center gap-2 px-5 py-2 bg-stone-900 text-white hover:bg-nobel-gold transition-colors shadow-sm cursor-pointer ml-4">
              <Mail size={14} />
              {t('nav.contact')}
            </a>

            {/* Language Switcher */}
            <button onClick={toggleLanguage} className="ml-2 px-2 py-1 border border-stone-300 hover:border-nobel-gold hover:text-nobel-gold transition-colors min-w-[32px] text-center">
                {i18n.language === 'it' ? 'EN' : 'IT'}
            </button>
          </div>

          <button className="lg:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-2xl font-serif animate-fade-in text-stone-900">
            <button onClick={() => navigateTo('home', 'intro')}>{t('nav.brand')}</button>
            <button onClick={() => navigateTo('home', 'works')}>{t('nav.works')}</button>
            <button onClick={() => navigateTo('atelier')}>{t('nav.atelier')}</button>
            <button onClick={() => navigateTo('atelier', 'process')}>{t('nav.process')}</button>
            <button onClick={() => navigateTo('atelier', 'formats')}>{t('nav.formats')}</button>
            
            <div className="flex gap-4 mt-4">
                <button onClick={() => { i18n.changeLanguage('it'); setMenuOpen(false); }} className={`px-4 py-2 border ${i18n.language === 'it' ? 'border-nobel-gold text-nobel-gold' : 'border-stone-300'}`}>IT</button>
                <button onClick={() => { i18n.changeLanguage('en'); setMenuOpen(false); }} className={`px-4 py-2 border ${i18n.language === 'en' ? 'border-nobel-gold text-nobel-gold' : 'border-stone-300'}`}>EN</button>
            </div>

            <a href="mailto:info@clz.it" className="px-6 py-3 bg-stone-900 text-white shadow-lg cursor-pointer flex items-center gap-2">
               <Mail size={18} /> {t('nav.contact')}
            </a>
        </div>
      )}

      <main>
          {activePage === 'home' ? <HomePage onNavigate={navigateTo} /> : <AtelierPage />}
      </main>

      <footer className="bg-stone-950 py-12 border-t border-stone-900 text-center">
           <div className="container mx-auto px-6">
               <div className="text-nobel-gold font-serif font-bold text-2xl mb-4">CLZ</div>
               <p className="text-stone-600 text-xs tracking-widest uppercase mb-6">&copy; {new Date().getFullYear()} Cooperativa Lavoratori Zanardi. {t('brand.location')}</p>
               <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-stone-500">
                  <a href="#" className="hover:text-white transition-colors">{t('brand.legal')}</a>
                  <a href="#" className="hover:text-white transition-colors">{t('brand.privacy')}</a>
                  <a href="#" className="hover:text-white transition-colors">{t('brand.credits')}</a>
               </div>
           </div>
      </footer>
    </div>
  );
};

export default App;