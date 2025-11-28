/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { AtelierPage } from './pages/AtelierPage';
import { ContactPage } from './pages/ContactPage';
import { Header } from './components/Header';
import { ROUTES } from './config/navigation';
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
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream text-stone-800 selection:bg-nobel-gold selection:text-white">
      <ScrollToTop />
      <Header />

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
  // Use Vite's BASE_URL for both dev and production
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

  return (
    <Router basename={basename}>
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