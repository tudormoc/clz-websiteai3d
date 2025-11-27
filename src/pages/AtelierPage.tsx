import React from 'react';
import { useTranslation } from 'react-i18next';
import { BindingLayersDiagram, FormatComparisonDiagram, BookAnatomyDiagram, MaxiSpecsDiagram, BindingTypesShowcase } from '../components/Diagrams';
import { SectionLabel, Headline, Subtitle, Body, PageLabel, SectionHeader } from '../components/Typography';
import { ServiceCard } from '../components/ServiceCard';
import { ASSETS } from '../config/constants';

export const AtelierPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="animate-fade-in">
            {/* Atelier Header - Enhanced Dark Theme - Left Aligned */}
            <div className="relative pt-48 pb-24 bg-dark-alt text-stone-200 overflow-hidden">
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${ASSETS.textures.stardust})` }}></div>
                {/* Radial Light */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.15)_0%,transparent_70%)] pointer-events-none"></div>

                <div className="relative container mx-auto px-6 z-10">
                    <PageLabel>{t('atelier.label')}</PageLabel>
                    <Headline as="h1" variant="light" size="page" className="mb-6 drop-shadow-2xl">{t('atelier.headline')}</Headline>
                    <Subtitle variant="light" italic className="max-w-3xl">
                        {t('atelier.sub')}
                    </Subtitle>
                </div>
            </div>

            {/* Process Section */}
            <section id="process" className="py-24 bg-stone-50">
                <div className="container mx-auto px-6">
                    <div className="mb-16 max-w-2xl">
                        <SectionHeader
                            label={t('process.label')}
                            headline={t('process.headline')}
                            subtitle={t('process.sub')}
                        />
                    </div>
                    <BindingLayersDiagram />
                </div>
            </section>

            {/* Binding Types Section */}
            <section id="bindings" className="py-24 bg-stone-950">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <SectionHeader
                            label={t('bindings.label')}
                            headline={t('bindings.headline')}
                            subtitle={t('bindings.sub')}
                            variant="light"
                            headlineSize="xl"
                            centered
                        />
                    </div>
                    <BindingTypesShowcase />
                </div>
            </section>

            {/* Anatomy Section */}
            <section id="anatomy" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <SectionLabel>{t('anatomy.label')}</SectionLabel>
                            <Headline className="mb-6">{t('anatomy.headline')}</Headline>
                            <BookAnatomyDiagram />
                        </div>
                        <div className="flex flex-col justify-center space-y-8">
                            <Body size="lg">
                                {t('anatomy.desc')}
                            </Body>
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
                    <div className="mb-16">
                        <SectionHeader
                            label={t('formats.label')}
                            headline={t('formats.headline')}
                            subtitle={t('formats.sub')}
                            variant="light"
                            headlineSize="xl"
                            centered
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        <FormatComparisonDiagram />
                        <div className="flex flex-col justify-center">
                            <Headline as="h3" variant="light" size="sm" className="mb-6 italic">{t('formats.text.headline')}</Headline>
                            <Body variant="light" size="lg" className="mb-8">
                                {t('formats.text.p1')}
                            </Body>
                            <MaxiSpecsDiagram />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
