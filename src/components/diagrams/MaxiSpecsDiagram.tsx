/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Ruler, Weight, Layers, BoxSelect } from 'lucide-react';

const SpecCard = ({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) => (
    <div className="group p-6 bg-stone-800/50 border border-stone-700 hover:border-nobel-gold transition-colors">
        <div className="flex items-center justify-between mb-4">
            {icon}
            <div className="text-3xl font-mono text-white font-bold">{value}</div>
        </div>
        <div className="text-sm text-stone-400 font-bold uppercase tracking-wider mb-2">{label}</div>
        <div className="text-xs text-stone-600">{sub}</div>
    </div>
);

export const MaxiSpecsDiagram: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <SpecCard
                icon={<Ruler className="text-nobel-gold" size={24} />}
                label={t('formats.specs.spine.label')}
                value="80mm"
                sub={t('formats.specs.spine.sub')}
            />
            <SpecCard
                icon={<Weight className="text-nobel-gold" size={24} />}
                label={t('formats.specs.weight.label')}
                value="12kg"
                sub={t('formats.specs.weight.sub')}
            />
            <SpecCard
                icon={<Layers className="text-nobel-gold" size={24} />}
                label={t('formats.specs.caliper.label')}
                value="5mm"
                sub={t('formats.specs.caliper.sub')}
            />
            <SpecCard
                icon={<BoxSelect className="text-nobel-gold" size={24} />}
                label={t('formats.specs.min.label')}
                value="100x150"
                sub={t('formats.specs.min.sub')}
            />
        </div>
    );
};
