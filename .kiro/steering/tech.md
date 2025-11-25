# Tech Stack

## Core Framework
- React 19 with TypeScript
- Vite 6 (build tool and dev server)

## 3D Graphics
- Three.js for WebGL rendering
- @react-three/fiber (React renderer for Three.js)
- @react-three/drei (useful helpers and abstractions)

## UI & Animation
- Framer Motion for animations and transitions
- Tailwind CSS (via utility classes in components)
- Lucide React for icons

## Internationalization
- i18next with react-i18next
- i18next-browser-languagedetector for auto language detection
- Translation files in `locales/` directory

## Common Commands

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration Files
- `vite.config.ts` - Vite configuration with path aliases (@/)
- `tsconfig.json` - TypeScript config (ES2022, bundler module resolution)
- `index.html` - Entry HTML file

## Environment Variables
- `GEMINI_API_KEY` - API key exposed as `process.env.API_KEY`
