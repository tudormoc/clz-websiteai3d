import React from 'react';

interface ServiceCardProps {
    title: string;
    sub: string;
    delay: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, sub, delay }) => {
    return (
        <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-sm border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-500 w-full max-w-xs hover:border-nobel-gold" style={{ animationDelay: delay }}>
            <h3 className="font-serif text-2xl lg:text-3xl text-stone-900 text-center mb-3 italic">{title}</h3>
            <div className="w-8 h-0.5 bg-nobel-gold mb-4 opacity-60 group-hover:w-24 transition-all duration-500"></div>
            <p className="text-sm text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{sub}</p>
        </div>
    );
};
