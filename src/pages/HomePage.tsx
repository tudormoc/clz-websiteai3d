import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { HeroScene } from '../components/QuantumScene';
import { LegacySection, SelectedWorks, GlobalReach } from '../components/Sections';
import { SectionLabel, Headline, Subtitle, Body, Tag, Divider } from '../components/Typography';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/navigation';

export const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleNavigate = (page: string, section?: string) => {
        // This function mimics the old onNavigate but using react-router
        // We can just use navigate directly in the onClick, but for compatibility with the existing logic structure:
        if (page === 'home') {
            const element = document.getElementById(section || 'intro');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(page === 'atelier' ? ROUTES.ATELIER : ROUTES.CONTACT);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-100">
                <HeroScene />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.0)_0%,rgba(249,248,244,0.5)_60%,rgba(249,248,244,1)_100%)]" />

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <div className="inline-block mb-6 px-4 py-1 border border-stone-300 text-stone-500 text-xs tracking-[0.3em] uppercase font-bold backdrop-blur-sm bg-white/40">
                        {t('brand.est')}
                    </div>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium leading-tight mb-8 text-stone-900 drop-shadow-sm">
                        Cooperativa <br />
                        <span className="text-4xl md:text-6xl lg:text-7xl block mt-2 text-stone-800">Lavoratori Zanardi</span>
                    </h1>
                    <Divider className="mx-auto mb-8" />
                    <Subtitle italic className="max-w-xl mx-auto mb-12 whitespace-pre-line">
                        {t('brand.subtitle')}
                    </Subtitle>

                    <div className="flex justify-center">
                        <button onClick={() => handleNavigate('home', 'intro')} className="group flex flex-col items-center gap-2 text-sm font-bold tracking-widest text-stone-400 hover:text-nobel-gold transition-colors cursor-pointer uppercase">
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
                                <span className="text-nobel-gold italic block text-3xl mb-2">{t('intro.badge')}</span>
                                {t('intro.title_card')}
                            </h3>
                        </div>
                    </div>
                    <div className="md:col-span-7 space-y-8">
                        <div>
                            <SectionLabel>{t('intro.label')}</SectionLabel>
                            <Headline size="lg" className="mb-6 whitespace-pre-line">{t('intro.headline')}</Headline>
                        </div>
                        <Body size="lg">
                            <Trans i18nKey="intro.p1" values={{ initial: 'W' }}>
                                <span className="text-6xl float-left mr-3 mt-[-12px] font-serif text-stone-300">W</span>e do not sell books; we construct them. Operating from Padova, CLZ serves an international clientele of museums, art galleries, and luxury publishers.
                            </Trans>
                        </Body>
                        <Body size="lg">
                            <Trans i18nKey="intro.p2">
                                We focus exclusively on <strong>Cardboard / Hardcover</strong> binding ("Cartonato"). We do not produce softcovers or brochures. Our facility merges heavy industrial precision with the delicate touch required for <strong className="text-stone-900">Maxi Extra</strong> formats and heavy-board limited editions.
                            </Trans>
                        </Body>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Tag>{t('intro.tag_case')}</Tag>
                            <Tag>{t('intro.tag_sewn')}</Tag>
                            <Tag>{t('intro.tag_qc')}</Tag>
                        </div>

                        <div className="pt-8">
                            <button
                                onClick={() => navigate(ROUTES.ATELIER)}
                                className="inline-flex items-center gap-2 text-stone-900 border-b-2 border-stone-900 pb-1 hover:text-nobel-gold hover:border-nobel-gold transition-colors text-base font-bold uppercase tracking-widest"
                            >
                                {t('intro.enter')} <ArrowRight size={16} />
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
