/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'nobel-gold': '#C5A059',
                'gold-light': '#E6CFA0',
                'gold-dark': '#997B3A',
                'cream': '#F9F8F4',
                'paper': '#EBE9E4',
                'paper-light': '#F5F4F0',
                'dark': '#1a1a1a',
                'dark-alt': '#111111',
                'black': '#0a0a0a',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
            },
            letterSpacing: {
                label: '0.15em',
                wide: '0.1em',
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
                'fade-in': 'fade-in 0.4s ease-out forwards',
                'shimmer': 'shimmer 3s ease-in-out infinite',
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' },
                },
            },
        },
    },
    plugins: [],
}
