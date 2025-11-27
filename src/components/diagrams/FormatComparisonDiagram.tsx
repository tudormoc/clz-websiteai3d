/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MoveHorizontal, MoveVertical } from 'lucide-react';

export const FormatComparisonDiagram: React.FC = () => {
    const { t } = useTranslation();
    const MAX_W = 435;
    const MAX_H = 605;
    const MIN_W = 150;
    const MIN_H = 200;

    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(400);
    const scaleFactor = 0.6;

    return (
        <div className="bg-stone-900 border border-stone-800 p-8 rounded-sm shadow-xl max-w-3xl mx-auto">
            <div className="flex justify-between items-end mb-8 pb-4 border-b border-stone-800">
                <div>
                    <h3 className="font-serif text-3xl text-white italic">{t('formats.config.title')}</h3>
                    <p className="text-stone-500 text-xs uppercase tracking-widest mt-2">{t('formats.config.limit')}</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-mono text-nobel-gold">{width}<span className="text-base text-stone-600 ml-1">mm</span> <span className="text-stone-700 mx-1">x</span> {height}<span className="text-base text-stone-600 ml-1">mm</span></div>
                </div>
            </div>

            <div className="h-[450px] bg-[#111] relative flex items-center justify-center border border-stone-800/50 overflow-hidden mb-8 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px]">
                <div
                    className="absolute border border-dashed border-stone-700 flex items-start justify-start p-2"
                    style={{
                        width: `${MAX_W * scaleFactor}px`,
                        height: `${MAX_H * scaleFactor}px`
                    }}
                >
                    <span className="text-[10px] text-stone-700 font-mono uppercase">{t('formats.config.max_cap')}: 435 x 605</span>
                </div>

                <div
                    className="bg-stone-200 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative transition-all duration-75 ease-out origin-center flex items-center justify-center"
                    style={{
                        width: `${width * scaleFactor}px`,
                        height: `${height * scaleFactor}px`
                    }}
                >
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-stone-300 border-r border-stone-400"></div>
                    <div className="text-center opacity-50 pointer-events-none">
                        <div className="text-stone-900 font-serif text-3xl font-bold">CLZ</div>
                        <div className="text-xs tracking-[0.3em] text-stone-500 mt-2">EXTRA FORMAT</div>
                    </div>
                    <div className="absolute -bottom-8 left-0 w-full text-center text-xs text-stone-500 font-mono">{width}mm</div>
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-xs text-stone-500 font-mono rotate-90">{height}mm</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-stone-950 p-6 rounded-sm border border-stone-800">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-stone-400 font-bold tracking-wider uppercase">
                        <span className="flex items-center gap-2"><MoveHorizontal size={16} /> {t('formats.config.width')}</span>
                        <span className="text-nobel-gold">{width} mm</span>
                    </div>
                    <input
                        type="range"
                        min={MIN_W}
                        max={MAX_W}
                        value={width}
                        onChange={(e) => setWidth(parseInt(e.target.value))}
                        className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-nobel-gold"
                        style={{ touchAction: 'none' }}
                    />
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-stone-400 font-bold tracking-wider uppercase">
                        <span className="flex items-center gap-2"><MoveVertical size={16} /> {t('formats.config.height')}</span>
                        <span className="text-nobel-gold">{height} mm</span>
                    </div>
                    <input
                        type="range"
                        min={MIN_H}
                        max={MAX_H}
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-nobel-gold"
                        style={{ touchAction: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};
