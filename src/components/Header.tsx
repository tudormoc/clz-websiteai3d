import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Mail, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES, NAVIGATION } from '../config/navigation';
import { BRAND } from '../config/constants';

export const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const handleNavigate = (path: string, section?: string) => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);

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

    const isActive = (path: string) => location.pathname === path;

    // Dynamic Theme Logic
    // We want a transparent header at the top, but solid/glass when scrolled
    // Also handle dark/light text based on page if not scrolled
    const isDarkHeader = !scrolled && (location.pathname === ROUTES.ATELIER || location.pathname === ROUTES.CONTACT);

    const textColor = scrolled ? 'text-stone-800' : (isDarkHeader ? 'text-white' : 'text-stone-900');
    const subTextColor = scrolled ? 'text-stone-500' : (isDarkHeader ? 'text-stone-300' : 'text-stone-500');
    const hoverColor = scrolled ? 'hover:text-nobel-gold' : (isDarkHeader ? 'hover:text-stone-200' : 'hover:text-nobel-gold');

    // Background logic
    const headerBg = scrolled
        ? 'bg-cream/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm'
        : 'bg-transparent';

    // Animation variants
    const menuVariants = {
        closed: { opacity: 0, x: "100%" },
        open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 20 },
        open: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } })
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg} ${scrolled ? 'py-4' : 'py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">

                    {/* --- BRAND --- */}
                    <div className="flex items-center gap-4 cursor-pointer group z-50" onClick={() => handleNavigate(ROUTES.HOME)}>
                        <div className={`w-10 h-10 md:w-12 md:h-12 border-2 border-nobel-gold flex items-center justify-center font-serif font-bold text-xl md:text-2xl shadow-sm bg-stone-900 text-nobel-gold transition-transform duration-500 group-hover:rotate-180`}>
                            C
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-serif font-bold text-lg md:text-xl tracking-widest transition-colors duration-500 leading-none ${textColor}`}>
                                {BRAND.name}
                            </span>
                            <span className={`text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${subTextColor}`}>
                                {t('brand.location')}
                            </span>
                        </div>
                    </div>

                    {/* --- DESKTOP NAVIGATION --- */}
                    <nav className={`hidden lg:flex items-center gap-8 text-sm font-bold tracking-widest uppercase transition-colors duration-500 ${textColor}`}>

                        {/* Brand Group (Dropdown) */}
                        <div className="relative group"
                            onMouseEnter={() => setActiveDropdown('brand')}
                            onMouseLeave={() => setActiveDropdown(null)}>
                            <button
                                onClick={() => handleNavigate(ROUTES.HOME)}
                                className={`flex items-center gap-1 py-2 ${hoverColor} ${isActive(ROUTES.HOME) ? 'text-nobel-gold' : ''}`}
                            >
                                {t('nav.brand')}
                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 transition-all duration-300 ${activeDropdown === 'brand' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                <div className="bg-white/95 backdrop-blur-xl border border-stone-100 shadow-xl rounded-sm overflow-hidden p-2 flex flex-col gap-1">
                                    {NAVIGATION.main.slice(1).map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={(e) => { e.stopPropagation(); handleNavigate(item.path, item.section); }}
                                            className="text-left px-4 py-3 text-xs text-stone-600 hover:bg-stone-50 hover:text-nobel-gold transition-colors rounded-sm uppercase tracking-widest"
                                        >
                                            {t(item.label)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Atelier Group (Dropdown) */}
                        <div className="relative group"
                            onMouseEnter={() => setActiveDropdown('atelier')}
                            onMouseLeave={() => setActiveDropdown(null)}>
                            <button
                                onClick={() => handleNavigate(ROUTES.ATELIER)}
                                className={`flex items-center gap-1 py-2 ${hoverColor} ${isActive(ROUTES.ATELIER) ? 'text-nobel-gold' : ''}`}
                            >
                                {t('nav.atelier')}
                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 transition-all duration-300 ${activeDropdown === 'atelier' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                <div className="bg-white/95 backdrop-blur-xl border border-stone-100 shadow-xl rounded-sm overflow-hidden p-2 flex flex-col gap-1">
                                    {NAVIGATION.atelier.slice(1).map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={(e) => { e.stopPropagation(); handleNavigate(item.path, item.section); }}
                                            className="text-left px-4 py-3 text-xs text-stone-600 hover:bg-stone-50 hover:text-nobel-gold transition-colors rounded-sm uppercase tracking-widest"
                                        >
                                            {t(item.label)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <button
                            onClick={() => handleNavigate(ROUTES.CONTACT)}
                            className={`flex items-center gap-2 px-5 py-2.5 transition-all duration-300 shadow-sm cursor-pointer rounded-sm border ${isActive(ROUTES.CONTACT) ? 'bg-nobel-gold border-nobel-gold text-white' : (isDarkHeader && !scrolled ? 'bg-white/10 border-white/30 text-white hover:bg-white hover:text-stone-900' : 'bg-stone-900 border-stone-900 text-white hover:bg-nobel-gold hover:border-nobel-gold')}`}
                        >
                            <Mail size={14} />
                            <span>{t('nav.contact')}</span>
                        </button>

                        {/* Language Switcher - Compact */}
                        <div className="flex items-center gap-2 ml-2">
                            <Globe size={14} className={subTextColor} />
                            <div className="flex text-xs font-bold">
                                {['it', 'en', 'fr'].map((lang, idx, arr) => (
                                    <React.Fragment key={lang}>
                                        <button
                                            onClick={() => changeLanguage(lang)}
                                            className={`hover:text-nobel-gold transition-colors ${i18n.language === lang ? 'text-nobel-gold' : subTextColor}`}
                                        >
                                            {lang.toUpperCase()}
                                        </button>
                                        {idx < arr.length - 1 && <span className={`mx-1 ${subTextColor} opacity-50`}>/</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* --- MOBILE TOGGLE --- */}
                    <button
                        className={`lg:hidden p-2 z-50 transition-colors ${mobileMenuOpen ? 'text-stone-900' : textColor}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* --- MOBILE MENU OVERLAY --- */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-40 bg-cream/98 backdrop-blur-xl flex flex-col"
                    >
                        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6 overflow-y-auto">

                            {/* Mobile Links */}
                            <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                                <motion.div custom={0} variants={itemVariants} className="w-full text-center border-b border-stone-200 pb-2 mb-2">
                                    <span className="text-xs uppercase tracking-[0.3em] text-stone-400">{t('nav.menu')}</span>
                                </motion.div>

                                <motion.button custom={1} variants={itemVariants} onClick={() => handleNavigate(ROUTES.HOME)} className="text-3xl font-serif text-stone-900 hover:text-nobel-gold transition-colors">
                                    {t('nav.brand')}
                                </motion.button>

                                {/* Sub-links for Brand */}
                                <div className="flex flex-col gap-3 items-center mb-4">
                                    {NAVIGATION.main.slice(1).map((item, i) => (
                                        <motion.button
                                            key={item.label}
                                            custom={1.5 + (i * 0.1)}
                                            variants={itemVariants}
                                            onClick={() => handleNavigate(item.path, item.section)}
                                            className="text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900"
                                        >
                                            {t(item.label)}
                                        </motion.button>
                                    ))}
                                </div>

                                <motion.button custom={2} variants={itemVariants} onClick={() => handleNavigate(ROUTES.ATELIER)} className="text-3xl font-serif text-stone-900 hover:text-nobel-gold transition-colors">
                                    {t('nav.atelier')}
                                </motion.button>

                                {/* Sub-links for Atelier */}
                                <div className="flex flex-col gap-3 items-center">
                                    {NAVIGATION.atelier.slice(1).map((item, i) => (
                                        <motion.button
                                            key={item.label}
                                            custom={3 + i}
                                            variants={itemVariants}
                                            onClick={() => handleNavigate(item.path, item.section)}
                                            className="text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900"
                                        >
                                            {t(item.label)}
                                        </motion.button>
                                    ))}
                                </div>

                                <motion.button
                                    custom={6}
                                    variants={itemVariants}
                                    onClick={() => handleNavigate(ROUTES.CONTACT)}
                                    className="mt-4 px-8 py-4 bg-stone-900 text-white shadow-lg w-full flex items-center justify-center gap-3 text-lg font-sans font-bold uppercase tracking-widest"
                                >
                                    <Mail size={20} /> {t('nav.contact')}
                                </motion.button>
                            </div>

                            {/* Mobile Language */}
                            <motion.div custom={7} variants={itemVariants} className="flex gap-6 mt-8 text-lg font-sans">
                                {['it', 'en', 'fr'].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => { changeLanguage(lang); }}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${i18n.language === lang ? 'border-nobel-gold text-nobel-gold font-bold bg-white shadow-sm' : 'border-stone-200 text-stone-400'}`}
                                    >
                                        {lang.toUpperCase()}
                                    </button>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
