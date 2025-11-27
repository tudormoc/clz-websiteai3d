export const BRAND = {
    name: 'CLZ',
    fullName: 'Cooperativa Lavoratori Zanardi',
    location: 'Padova, Italy',
    est: 'EST. 1970',
    legal: 'Legal',
    privacy: 'Privacy',
    credits: 'Credits',
    subtitle: 'The art of bookbinding.\nElevated to an industrial standard.',
    description: 'We do not sell books; we construct them. Operating from Padova, CLZ serves an international clientele of museums, art galleries, and luxury publishers.',
};

export const CONTACT = {
    address: 'Via Venezia, 15\n35131 Padova (PD)\nItaly',
    phone: '+39 049 000 0000',
    email: 'info@clz.it',
    phoneLink: 'tel:+39049000000',
    emailLink: 'mailto:info@clz.it',
};

// Base URL for assets (matches vite.config.ts base)
const BASE_URL = import.meta.env.BASE_URL;

export const ASSETS = {
    textures: {
        stardust: `${BASE_URL}assets/textures/stardust.png`, // Localized asset
    }
};
