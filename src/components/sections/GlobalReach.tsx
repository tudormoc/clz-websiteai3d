/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Building2, BookOpen } from 'lucide-react';
import { Headline } from '../Typography';

export const GlobalReach = () => {
    const { t } = useTranslation();
    return (
        <section className="py-24 border-t border-stone-200 bg-stone-50">
            <div className="container mx-auto px-6 text-center">
                <Headline as="h2" size="sm" className="mb-12 italic">{t('global.headline')}</Headline>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder for Client Logos - Using Typography for now */}
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <Building2 size={36} className="text-stone-800 group-hover:text-nobel-gold transition-colors" />
                        <span className="font-serif font-bold text-xl">{t('global.museums')}</span>
                        <span className="text-xs uppercase tracking-widest text-stone-400">{t('global.sub_archival')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <BookOpen size={36} className="text-stone-800 group-hover:text-nobel-gold transition-colors" />
                        <span className="font-serif font-bold text-xl">{t('global.publishers')}</span>
                        <span className="text-xs uppercase tracking-widest text-stone-400">{t('global.sub_highvol')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <Globe size={36} className="text-stone-800 group-hover:text-nobel-gold transition-colors" />
                        <span className="font-serif font-bold text-xl">{t('global.galleries')}</span>
                        <span className="text-xs uppercase tracking-widest text-stone-400">{t('global.sub_limited')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <div className="text-3xl font-serif font-bold border-2 border-stone-800 px-4 py-2 group-hover:border-nobel-gold group-hover:text-nobel-gold transition-colors">ISO 9001</div>
                        <span className="text-xs uppercase tracking-widest mt-2">{t('global.iso')}</span>
                    </div>
                </div>

                <div className="mt-16 pt-16 border-t border-stone-200 flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-stone-400">
                    <span>{t('global.cities.ny')}</span>
                    <span className="text-nobel-gold">•</span>
                    <span>{t('global.cities.ldn')}</span>
                    <span className="text-nobel-gold">•</span>
                    <span>{t('global.cities.par')}</span>
                    <span className="text-nobel-gold">•</span>
                    <span>{t('global.cities.mil')}</span>
                    <span className="text-nobel-gold">•</span>
                    <span>{t('global.cities.ber')}</span>
                    <span className="text-nobel-gold">•</span>
                    <span>{t('global.cities.tok')}</span>
                </div>
            </div>
        </section>
    )
}
