import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContactScene } from '../components/QuantumScene';
import { PageLabel, Headline, Subtitle } from '../components/Typography';
import { Phone, Mail, Send } from 'lucide-react';
import { ASSETS, CONTACT } from '../config/constants';

export const ContactPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="animate-fade-in">
            {/* Contact Header - Enhanced Dark Theme */}
            <div className="relative pt-48 pb-20 bg-black text-stone-200 border-b border-stone-800 overflow-hidden">
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: `url(${ASSETS.textures.stardust})` }}></div>
                {/* Spotlight Gradient */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.1)_0%,transparent_60%)] pointer-events-none"></div>

                <div className="relative container mx-auto px-6 z-10">
                    <PageLabel>{t('contact.label')}</PageLabel>
                    <Headline as="h1" variant="light" size="page" className="mb-6 drop-shadow-2xl">{t('contact.headline')}</Headline>
                    <Subtitle variant="light" italic className="max-w-3xl">
                        {t('contact.sub')}
                    </Subtitle>
                </div>
            </div>

            <section className="bg-cream">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                    {/* Immersive 3D Map / Location */}
                    <div className="lg:col-span-6 relative h-[500px] lg:h-auto bg-stone-900 overflow-hidden">
                        <ContactScene />
                        <div className="absolute top-8 left-8 p-8 bg-white/90 backdrop-blur-sm shadow-xl border-l-4 border-nobel-gold max-w-sm">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">{t('contact.info.address_label')}</h3>
                                    <p className="font-serif text-2xl text-stone-900 whitespace-pre-line leading-snug">{CONTACT.address}</p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <a href={CONTACT.phoneLink} className="flex items-center gap-3 text-stone-600 hover:text-nobel-gold transition-colors">
                                        <Phone size={16} /> <span className="text-base font-mono">{CONTACT.phone}</span>
                                    </a>
                                    <a href={CONTACT.emailLink} className="flex items-center gap-3 text-stone-600 hover:text-nobel-gold transition-colors">
                                        <Mail size={16} /> <span className="text-base font-mono">{CONTACT.email}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simplified Form */}
                    <div className="lg:col-span-6 p-8 lg:p-24 bg-white flex flex-col justify-center">
                        <form className="space-y-12 max-w-xl mx-auto w-full">
                            <div className="space-y-10">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('contact.form.name')}</label>
                                    <input type="text" className="w-full border-b border-stone-300 py-3 text-stone-900 focus:outline-none focus:border-nobel-gold transition-colors font-serif text-3xl bg-transparent placeholder-stone-300" placeholder={t('contact.form.name_placeholder')} />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('contact.form.company')}</label>
                                    <input type="text" className="w-full border-b border-stone-300 py-3 text-stone-900 focus:outline-none focus:border-nobel-gold transition-colors font-serif text-3xl bg-transparent placeholder-stone-300" placeholder={t('contact.form.company_placeholder')} />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('contact.form.email')}</label>
                                    <input type="email" className="w-full border-b border-stone-300 py-3 text-stone-900 focus:outline-none focus:border-nobel-gold transition-colors font-serif text-3xl bg-transparent placeholder-stone-300" placeholder={t('contact.form.email_placeholder')} />
                                </div>
                            </div>

                            <div className="space-y-3 pt-6">
                                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('contact.form.specs')}</label>
                                <textarea rows={5} className="w-full border border-stone-200 p-5 text-stone-900 focus:outline-none focus:border-nobel-gold transition-colors bg-stone-50 resize-none font-sans text-lg" placeholder={t('contact.form.specs_placeholder')}></textarea>
                            </div>

                            <div className="pt-6 flex justify-start">
                                <button type="button" className="px-12 py-6 bg-stone-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-nobel-gold transition-colors flex items-center gap-3 shadow-xl">
                                    {t('contact.form.submit')} <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
