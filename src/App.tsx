/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Mail } from 'lucide-react';

import { HomePage } from './pages/HomePage';
import { AtelierPage } from './pages/AtelierPage';
import { ContactPage } from './pages/ContactPage';
import { ROUTES, NAVIGATION } from './config/navigation';
import { BRAND } from './config/constants';

// --- SCROLL HANDLER ---
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// --- LAYOUT COMPONENT ---
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (path: string, section?: string) => {
    setMenuOpen(false);
    if (section) {
      navigate(`${path}#${section}`);
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // --- DYNAMIC THEME LOGIC ---
  const isDarkHeader = !scrolled && (location.pathname === ROUTES.ATELIER || location.pathname === ROUTES.CONTACT);

  const navTextColor = isDarkHeader ? 'text-white drop-shadow-md' : 'text-stone-900';
  const navSubTextColor = isDarkHeader ? 'text-stone-300 drop-shadow-sm' : 'text-stone-500';
  const navLinkColor = isDarkHeader ? 'text-stone-200 drop-shadow-sm' : 'text-stone-600';
  const navBorderColor = isDarkHeader ? 'border-stone-500' : 'border-stone-300';
  const navBgColor = scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-stone-200' : 'bg-transparent';

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-cream text-stone-800 selection:bg-nobel-gold selection:text-white">
      <ScrollToTop />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 ${navBgColor}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">

          {/* Brand Logo */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => handleNavigate(ROUTES.HOME)}>
            <div className={`w-12 h-12 border-2 border-nobel-gold flex items-center justify-center font-serif font-bold text-2xl shadow-sm bg-stone-900 text-nobel-gold transition-transform duration-500 group-hover:rotate-180`}>C</div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-xl tracking-widest transition-colors duration-500 leading-none ${navTextColor}`}>
                {BRAND.name}
              </span>
              <span className={`text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${navSubTextColor}`}>{t('brand.location')}</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden lg:flex items-center gap-8 text-sm font-bold tracking-widest uppercase transition-colors duration-500 ${navLinkColor}`}>
            {/* Home Links */}
            {NAVIGATION.main.map((item) => (
              <button key={item.label} onClick={() => handleNavigate(item.path, item.section)} className={`hover:text-nobel-gold transition-colors ${isActive(item.path) && !item.section ? (isDarkHeader ? 'text-white' : 'text-stone-900') : ''}`}>{t(item.label)}</button>
            ))}

            <span className="opacity-30">|</span>

            {/* Atelier Links */}
            {NAVIGATION.atelier.map((item) => (
              <button key={item.label} onClick={() => handleNavigate(item.path, item.section)} className={`hover:text-nobel-gold transition-colors ${isActive(item.path) && !item.section ? 'text-nobel-gold' : ''}`}>{t(item.label)}</button>
            ))}

            {/* Contact Button */}
            <button onClick={() => handleNavigate(ROUTES.CONTACT)} className={`flex items-center gap-2 px-6 py-3 transition-all duration-300 shadow-sm cursor-pointer ml-4 font-bold border ${isActive(ROUTES.CONTACT) ? 'bg-nobel-gold border-nobel-gold text-white' : isDarkHeader ? 'bg-transparent border-white text-white hover:bg-white hover:text-stone-900' : 'bg-stone-900 border-stone-900 text-white hover:bg-nobel-gold hover:border-nobel-gold'}`}>
              <Mail size={16} />
              {t('nav.contact')}
            </button>

            {/* Language Switcher */}
            <div className={`flex ml-4 border rounded-sm transition-colors duration-500 ${navBorderColor}`}>
              <button onClick={() => changeLanguage('it')} className={`px-3 py-1.5 hover:text-nobel-gold transition-colors min-w-[40px] text-center ${i18n.language === 'it' ? 'font-bold text-nobel-gold' : ''}`}>IT</button>
              <div className={`w-px ${isDarkHeader ? 'bg-stone-700' : 'bg-stone-300'}`}></div>
              <button onClick={() => changeLanguage('en')} className={`px-3 py-1.5 hover:text-nobel-gold transition-colors min-w-[40px] text-center ${i18n.language === 'en' ? 'font-bold text-nobel-gold' : ''}`}>EN</button>
              <div className={`w-px ${isDarkHeader ? 'bg-stone-700' : 'bg-stone-300'}`}></div>
              <button onClick={() => changeLanguage('fr')} className={`px-3 py-1.5 hover:text-nobel-gold transition-colors min-w-[40px] text-center ${i18n.language === 'fr' ? 'font-bold text-nobel-gold' : ''}`}>FR</button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className={`lg:hidden p-2 transition-colors ${navTextColor}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-10 text-3xl font-serif animate-fade-in text-stone-900">
          {NAVIGATION.main.map((item) => (
            <button key={item.label} onClick={() => handleNavigate(item.path, item.section)}>{t(item.label)}</button>
          ))}
          {NAVIGATION.atelier.map((item) => (
            <button key={item.label} onClick={() => handleNavigate(item.path, item.section)}>{t(item.label)}</button>
          ))}
          <button onClick={() => handleNavigate(ROUTES.CONTACT)}>{t('nav.contact')}</button>

          <div className="flex gap-6 mt-6 text-lg font-sans">
            <button onClick={() => { i18n.changeLanguage('it'); setMenuOpen(false); }} className={`px-6 py-3 border ${i18n.language === 'it' ? 'border-nobel-gold text-nobel-gold font-bold' : 'border-stone-300'}`}>IT</button>
            <button onClick={() => { i18n.changeLanguage('en'); setMenuOpen(false); }} className={`px-6 py-3 border ${i18n.language === 'en' ? 'border-nobel-gold text-nobel-gold font-bold' : 'border-stone-300'}`}>EN</button>
            <button onClick={() => { i18n.changeLanguage('fr'); setMenuOpen(false); }} className={`px-6 py-3 border ${i18n.language === 'fr' ? 'border-nobel-gold text-nobel-gold font-bold' : 'border-stone-300'}`}>FR</button>
          </div>

          <button onClick={() => handleNavigate(ROUTES.CONTACT)} className="px-8 py-4 bg-stone-900 text-white shadow-lg cursor-pointer flex items-center gap-3 text-lg font-sans font-bold uppercase tracking-widest mt-4">
            <Mail size={20} /> {t('nav.contact')}
          </button>
        </div>
      )}

      <main>
        {children}
      </main>

      <footer className="bg-stone-950 py-16 border-t border-stone-900 text-center">
        <div className="container mx-auto px-6">
          <div className="text-nobel-gold font-serif font-bold text-3xl mb-6">{BRAND.name}</div>
          <p className="text-stone-500 text-sm tracking-widest uppercase mb-8">&copy; {new Date().getFullYear()} {BRAND.fullName}. {t('brand.location')}</p>
          <div className="flex justify-center gap-10 text-sm font-bold uppercase tracking-widest text-stone-600">
            <a href="#" className="hover:text-white transition-colors">{t('brand.legal')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('brand.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('brand.credits')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  return (
    <Router basename="/clz-websiteai3d">
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ATELIER} element={<AtelierPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;