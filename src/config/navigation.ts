export const ROUTES = {
    HOME: '/',
    ATELIER: '/atelier',
    CONTACT: '/contact',
};

export const NAVIGATION = {
    main: [
        { label: 'nav.brand', path: ROUTES.HOME, section: 'intro' },
        { label: 'nav.legacy', path: ROUTES.HOME, section: 'legacy' },
        { label: 'nav.works', path: ROUTES.HOME, section: 'works' },
    ],
    atelier: [
        { label: 'nav.atelier', path: ROUTES.ATELIER },
        { label: 'nav.process', path: ROUTES.ATELIER, section: 'process' },
        { label: 'nav.bindings', path: ROUTES.ATELIER, section: 'bindings' },
        { label: 'nav.formats', path: ROUTES.ATELIER, section: 'formats' },
    ],
};
