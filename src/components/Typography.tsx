/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Typography Components
 * =====================
 * Reusable text components for consistent styling.
 * Uses Tailwind classes that match the original design.
 */

import React from 'react';

// ============================================
// TYPES
// ============================================
type TextVariant = 'dark' | 'light';
type HeadlineSize = 'sm' | 'md' | 'lg' | 'xl' | 'page';

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

interface VariantProps extends BaseProps {
  variant?: TextVariant;
}

interface HeadlineProps extends VariantProps {
  size?: HeadlineSize;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
}

// ============================================
// STYLE MAPS - Original Tailwind sizes
// ============================================
const headlineSizes: Record<HeadlineSize, string> = {
  sm: 'text-2xl lg:text-3xl',      // ~1.5-1.875rem
  md: 'text-3xl md:text-4xl',      // ~1.875-2.25rem  
  lg: 'text-4xl md:text-5xl',      // ~2.25-3rem
  xl: 'text-5xl md:text-6xl',      // ~3-3.75rem
  page: 'text-6xl md:text-7xl lg:text-8xl', // ~3.75-6rem
};

const variantColors = {
  dark: 'text-stone-900',
  light: 'text-white',
};

const subtitleColors = {
  dark: 'text-stone-600',
  light: 'text-stone-400',
};

// ============================================
// SECTION LABEL
// Small uppercase gold text above headlines
// Original: text-sm font-bold tracking-widest text-nobel-gold uppercase
// ============================================
export const SectionLabel: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`inline-block mb-3 text-sm font-bold tracking-label text-nobel-gold uppercase ${className}`}>
    {children}
  </div>
);

// ============================================
// HEADLINE
// Original: font-serif text-5xl text-stone-900 (varies by context)
// ============================================
export const Headline: React.FC<HeadlineProps> = ({
  children,
  variant = 'dark',
  size = 'lg',
  as: Component = 'h2',
  className = ''
}) => {
  const colorClass = variantColors[variant];

  return (
    <Component className={`font-serif ${headlineSizes[size]} leading-tight ${colorClass} ${className}`}>
      {children}
    </Component>
  );
};

// ============================================
// SUBTITLE
// Original: text-xl text-stone-600 leading-relaxed (or text-stone-400 for light)
// ============================================
interface SubtitleProps extends VariantProps {
  size?: 'sm' | 'md' | 'lg';
  italic?: boolean;
}

export const Subtitle: React.FC<SubtitleProps> = ({
  children,
  variant = 'dark',
  size = 'md',
  italic = false,
  className = ''
}) => {
  const colorClass = subtitleColors[variant];
  const sizeClass = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const italicClass = italic ? 'font-serif italic' : '';

  return (
    <p className={`${sizeClass} ${colorClass} leading-relaxed ${italicClass} ${className}`}>
      {children}
    </p>
  );
};

// ============================================
// BODY TEXT
// Original: text-xl text-stone-600 leading-relaxed
// ============================================
interface BodyProps extends VariantProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Body: React.FC<BodyProps> = ({
  children,
  variant = 'dark',
  size = 'md',
  className = ''
}) => {
  const colorClass = subtitleColors[variant];
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';

  return (
    <p className={`${sizeClass} ${colorClass} leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

// ============================================
// STAT
// Original: text-4xl font-serif text-nobel-gold + text-xs uppercase tracking-widest
// ============================================
interface StatProps {
  value: string | number;
  label: string;
  className?: string;
}

export const Stat: React.FC<StatProps> = ({ value, label, className = '' }) => (
  <div className={className}>
    <div className="text-4xl font-serif text-nobel-gold">{value}</div>
    <div className="text-xs uppercase tracking-widest text-stone-500 mt-2">{label}</div>
  </div>
);

// ============================================
// SPEC ITEM
// Technical specification label + value pairs
// ============================================
interface SpecItemProps {
  label: string;
  value: string;
  variant?: TextVariant;
  className?: string;
}

export const SpecItem: React.FC<SpecItemProps> = ({
  label,
  value,
  variant = 'dark',
  className = ''
}) => {
  const labelColor = variant === 'dark' ? 'text-stone-400' : 'text-stone-500';
  const valueColor = variant === 'dark' ? 'text-stone-700' : 'text-white';

  return (
    <div className={`space-y-1 ${className}`}>
      <div className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{label}</div>
      <div className={`text-sm ${valueColor}`}>{value}</div>
    </div>
  );
};

// ============================================
// PAGE LABEL
// Badge-style label for page headers (Atelier, Contact)
// Original: inline-block mb-4 px-5 py-2 border border-stone-700/50 bg-white/5 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-nobel-gold shadow-lg
// ============================================
export const PageLabel: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`inline-block mb-4 px-5 py-2 border border-stone-700/50 bg-white/5 backdrop-blur-md rounded-full text-xs uppercase tracking-label text-nobel-gold shadow-lg ${className}`}>
    {children}
  </div>
);

// ============================================
// TAG
// Original: px-5 py-3 bg-stone-50 border border-stone-200 text-sm font-bold uppercase tracking-wider text-stone-500
// ============================================
export const Tag: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`px-5 py-3 bg-stone-50 border border-stone-200 text-sm font-bold uppercase tracking-wider text-stone-500 ${className}`}>
    {children}
  </div>
);

// ============================================
// DIVIDER
// Gold accent line
// Original: w-24 h-1 bg-nobel-gold (or w-8 h-0.5 for small)
// ============================================
interface DividerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ size = 'md', className = '' }) => {
  const sizeClass = size === 'sm' ? 'w-8 h-0.5 opacity-60' : size === 'lg' ? 'w-32 h-1' : 'w-24 h-1';
  return <div className={`bg-nobel-gold ${sizeClass} ${className}`} />;
};

// ============================================
// SECTION HEADER
// Combines Label + Headline + optional Subtitle
// ============================================
interface SectionHeaderProps {
  label: string;
  headline: string;
  subtitle?: string;
  variant?: TextVariant;
  headlineSize?: HeadlineSize;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  headline,
  subtitle,
  variant = 'dark',
  headlineSize = 'lg',
  centered = false,
  className = ''
}) => {
  const alignClass = centered ? 'text-center' : '';

  return (
    <div className={`${alignClass} ${className}`}>
      <SectionLabel>{label}</SectionLabel>
      <Headline variant={variant} size={headlineSize} className="mb-6">
        {headline}
      </Headline>
      {subtitle && (
        <Subtitle variant={variant} className={centered ? 'max-w-2xl mx-auto' : ''}>
          {subtitle}
        </Subtitle>
      )}
    </div>
  );
};

// ============================================
// LIST ITEM BUTTON
// Interactive list items (for diagrams, etc.)
// ============================================
interface ListItemButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  variant?: TextVariant;
  className?: string;
}

export const ListItemButton: React.FC<ListItemButtonProps> = ({
  children,
  isActive,
  onClick,
  variant = 'dark',
  className = ''
}) => {
  const baseClass = 'w-full text-left px-4 py-4 border-l-2 transition-all duration-300';

  const activeClass = variant === 'dark'
    ? 'border-nobel-gold bg-stone-50 pl-6'
    : 'border-nobel-gold bg-stone-800/50 pl-5';

  const inactiveClass = variant === 'dark'
    ? 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
    : 'border-stone-700 hover:border-stone-500 hover:bg-stone-800/30';

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${isActive ? activeClass : inactiveClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default {
  SectionLabel,
  Headline,
  Subtitle,
  Body,
  Stat,
  SpecItem,
  PageLabel,
  Tag,
  Divider,
  SectionHeader,
  ListItemButton,
};
