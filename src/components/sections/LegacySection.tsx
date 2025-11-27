/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { SectionLabel, Headline, Body, Stat } from '../Typography';

export const LegacySection = () => {
    const { t } = useTranslation();

    return (
        <section id="legacy" className="py-24 bg-stone-900 text-stone-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-stone-800/20 to-transparent pointer-events-none"></div>
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <SectionLabel>{t('legacy.label')}</SectionLabel>
                    <Headline variant="light" className="mb-8 whitespace-pre-line">
                        {t('legacy.headline')}
                    </Headline>
                    <div className="space-y-6">
                        <Body variant="light" size="lg">
                            {t('legacy.p1')}
                        </Body>
                        <Body variant="light" size="lg">
                            <Trans i18nKey="legacy.p2">
                                We successfully bridged the gap between <strong className="text-white">hand-craftsmanship</strong> and <strong className="text-white">industrial scale</strong>. Today, our facility in Padova houses unique machinery capable of handling formats and materials that standard binderies simply cannot touch.
                            </Trans>
                        </Body>
                    </div>

                    <div className="mt-12 grid grid-cols-3 gap-6 border-t border-stone-800 pt-8">
                        <Stat value="1963" label={t('legacy.stat_est')} />
                        <Stat value="4M+" label={t('legacy.stat_books')} />
                        <Stat value="55" label={t('legacy.stat_artisans')} />
                    </div>
                </div>
                <div className="relative h-[500px] border border-stone-800 bg-stone-950 p-8 flex items-center justify-center">
                    {/* Abstract representation of history/archive */}
                    <div className="absolute inset-4 border border-stone-800"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(197,160,89,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                    <div className="text-center z-10">
                        <div className="text-6xl font-serif italic text-stone-800 mb-2">{t('legacy.since')}</div>
                        <div className="text-9xl font-bold text-stone-800">1963</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
