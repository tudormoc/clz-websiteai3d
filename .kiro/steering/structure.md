# Project Structure

```
/
├── components/           # React components
│   ├── Diagrams.tsx     # Interactive diagrams (binding process, book anatomy, format configurator)
│   ├── QuantumScene.tsx # 3D scenes (hero, contact page)
│   └── Sections.tsx     # Page sections (legacy, works, global reach)
├── locales/             # i18n translation files
│   ├── en.ts            # English translations
│   ├── fr.ts            # French translations
│   └── it.ts            # Italian translations (default)
├── App.tsx              # Main app with routing and page components
├── index.tsx            # React entry point
├── index.css            # Global styles
├── index.html           # HTML template
├── i18n.ts              # i18next configuration
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite build configuration
└── tsconfig.json        # TypeScript configuration
```

## Architecture Patterns

### Routing
- Client-side routing via React state (`activePage`)
- Three main pages: Home, Atelier, Contact
- Section deep-linking with smooth scroll

### Component Organization
- Page-level components defined in `App.tsx`
- Reusable UI components in `components/`
- 3D scenes isolated in `QuantumScene.tsx`
- Interactive diagrams grouped in `Diagrams.tsx`

### Internationalization
- All user-facing strings use `useTranslation()` hook
- Translation keys organized by feature/section
- `Trans` component for strings with embedded markup

### Styling
- Tailwind utility classes inline
- Custom color: `nobel-gold` (#C5A059)
- Consistent design tokens: stone color palette, serif fonts
