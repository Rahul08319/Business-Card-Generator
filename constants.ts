import { Template, CardPreset } from './types';

export const TEMPLATES: Template[] = [
    {
        id: 'cupertino',
        name: 'Cupertino Minimal',
        description: 'Apple Card aesthetic with debossed typography and sleek corner badge.',
        category: 'Apple',
        thumbnailSvg: `<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="60" rx="6" fill="#1C1C1E"/><rect x="8" y="10" width="16" height="12" rx="2" fill="#E5E5EA" fill-opacity="0.3"/><rect x="8" y="32" width="40" height="4" rx="2" fill="#FFFFFF"/><rect x="8" y="39" width="24" height="3" rx="1.5" fill="#8E8E93"/><rect x="8" y="46" width="30" height="2.5" rx="1" fill="#636366"/><circle cx="85" cy="45" r="5" fill="#0071E3"/></svg>`,
    },
    {
        id: 'executive',
        name: 'Executive Titanium',
        description: 'Brushed metal feel with precision accent divider and structured grid.',
        category: 'Executive',
        thumbnailSvg: `<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="60" rx="6" fill="#0F172A"/><line x1="45" y1="8" x2="45" y2="52" stroke="#38BDF8" stroke-width="1.5"/><rect x="10" y="14" width="28" height="4" rx="2" fill="#FFFFFF"/><rect x="10" y="22" width="20" height="3" rx="1.5" fill="#94A3B8"/><rect x="52" y="18" width="38" height="2.5" rx="1" fill="#E2E8F0"/><rect x="52" y="25" width="34" height="2.5" rx="1" fill="#E2E8F0"/><rect x="52" y="32" width="30" height="2.5" rx="1" fill="#E2E8F0"/></svg>`,
    },
    {
        id: 'glassmorphism',
        name: 'Frosted Glass',
        description: 'Translucent acrylic glass with vibrant refraction and soft glow.',
        category: 'Creative',
        thumbnailSvg: `<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g1" x1="0" y1="0" x2="100" y2="60" gradientUnits="userSpaceOnUse"><stop stop-color="#4F46E5"/><stop offset="1" stop-color="#EC4899"/></linearGradient></defs><rect width="100" height="60" rx="6" fill="url(#g1)"/><rect x="6" y="6" width="88" height="48" rx="4" fill="white" fill-opacity="0.25" stroke="white" stroke-opacity="0.4"/><rect x="12" y="14" width="32" height="4" rx="2" fill="white"/><rect x="12" y="22" width="22" height="3" rx="1.5" fill="white" fill-opacity="0.8"/><rect x="12" y="38" width="40" height="2.5" rx="1" fill="white" fill-opacity="0.7"/></svg>`,
    },
    {
        id: 'obsidian',
        name: 'Obsidian Dark',
        description: 'Ultra-deep midnight contrast with laser-accented typography.',
        category: 'Apple',
        thumbnailSvg: `<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="60" rx="6" fill="#09090B"/><rect x="8" y="12" width="36" height="4" rx="2" fill="#F4F4F5"/><rect x="8" y="20" width="26" height="3" rx="1.5" fill="#EAB308"/><rect x="8" y="40" width="44" height="2.5" rx="1" fill="#71717A"/><rect x="8" y="46" width="38" height="2.5" rx="1" fill="#71717A"/><circle cx="84" cy="18" r="6" fill="#EAB308" fill-opacity="0.2" stroke="#EAB308"/></svg>`,
    },
    {
        id: 'modern',
        name: 'Modern Studio',
        description: 'Bold modern hierarchy with balanced contact information.',
        category: 'Creative',
        thumbnailSvg: `<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="60" rx="6" fill="#2563EB"/><rect x="10" y="12" width="34" height="5" rx="2" fill="white"/><rect x="10" y="21" width="24" height="3" rx="1.5" fill="#BFDBFE"/><line x1="10" y1="28" x2="40" y2="28" stroke="#93C5FD"/><rect x="50" y="34" width="40" height="2.5" rx="1" fill="white"/><rect x="50" y="40" width="35" height="2.5" rx="1" fill="white"/></svg>`,
    },
    {
        id: 'classic',
        name: 'Classic Heritage',
        description: 'Timeless traditional business layout with balanced two-column flow.',
        category: 'Classic',
        thumbnailSvg: `<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="60" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/><rect x="10" y="16" width="32" height="4" rx="2" fill="#1E293B"/><rect x="10" y="24" width="22" height="3" rx="1.5" fill="#64748B"/><rect x="10" y="31" width="26" height="2.5" rx="1" fill="#0EA5E9"/><rect x="60" y="34" width="30" height="2" rx="1" fill="#475569"/><rect x="60" y="39" width="30" height="2" rx="1" fill="#475569"/><rect x="60" y="44" width="30" height="2" rx="1" fill="#475569"/></svg>`,
    },
    {
        id: 'minimalist',
        name: 'Pure Minimalist',
        description: 'Spacious editorial center-aligned layout with subtle tracking.',
        category: 'Classic',
        thumbnailSvg: `<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="60" rx="6" fill="#FAFAFA" stroke="#E5E5E5"/><rect x="30" y="18" width="40" height="4" rx="2" fill="#18181B"/><rect x="38" y="26" width="24" height="2.5" rx="1" fill="#71717A"/><line x1="42" y1="33" x2="58" y2="33" stroke="#A1A1AA"/><rect x="32" y="38" width="36" height="2" rx="1" fill="#52525B"/></svg>`,
    },
];

export const CARD_PRESETS: CardPreset[] = [
    {
        id: 'apple-titanium',
        name: 'Apple Titanium',
        description: 'Natural brushed titanium, deep gray contrast & crisp Cupertino type.',
        templateId: 'cupertino',
        styles: {
            backgroundColor: '#1c1c1e',
            textColor: '#f5f5f7',
            accentColor: '#0071e3',
            useGradient: true,
            gradientColor: '#2c2c2e',
            gradientDirection: 'to-br',
            cardFinish: 'titanium',
            borderRadius: 'squircle',
            showChip: true,
            showNfcBadge: true,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        }
    },
    {
        id: 'midnight-obsidian',
        name: 'Midnight Gold',
        description: 'Pure stealth black with warm brushed gold accents.',
        templateId: 'obsidian',
        styles: {
            backgroundColor: '#0a0a0c',
            textColor: '#ffffff',
            accentColor: '#e5a93c',
            useGradient: false,
            cardFinish: 'matte',
            borderRadius: 'squircle',
            showChip: true,
            showNfcBadge: true,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        }
    },
    {
        id: 'frosted-acrylic',
        name: 'Frosted Glass',
        description: 'Translucent liquid glass with vibrant blue backlight.',
        templateId: 'glassmorphism',
        styles: {
            backgroundColor: '#1e293b',
            textColor: '#ffffff',
            accentColor: '#38bdf8',
            useGradient: true,
            gradientColor: '#0f172a',
            gradientDirection: 'to-br',
            cardFinish: 'glass',
            borderRadius: 'squircle',
            showChip: false,
            showNfcBadge: true,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        }
    },
    {
        id: 'starlight-pearl',
        name: 'Starlight Pearl',
        description: 'Apple signature clean light aesthetic with warm gray & ocean blue.',
        templateId: 'cupertino',
        styles: {
            backgroundColor: '#f5f5f7',
            textColor: '#1d1d1f',
            accentColor: '#0071e3',
            useGradient: true,
            gradientColor: '#e5e5ea',
            gradientDirection: 'to-b',
            cardFinish: 'matte',
            borderRadius: 'squircle',
            showChip: true,
            showNfcBadge: true,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        }
    },
    {
        id: 'emerald-luxury',
        name: 'Emerald Executive',
        description: 'Deep forest green luxury with champagne metallic accents.',
        templateId: 'executive',
        styles: {
            backgroundColor: '#06281e',
            textColor: '#f0fdf4',
            accentColor: '#4ade80',
            useGradient: true,
            gradientColor: '#021812',
            gradientDirection: 'to-br',
            cardFinish: 'titanium',
            borderRadius: 'squircle',
            showChip: true,
            showNfcBadge: true,
            fontFamily: 'Georgia, serif',
        }
    },
    {
        id: 'sunset-chroma',
        name: 'Sunset Chroma',
        description: 'Dynamic gradient flow with high-contrast modern typography.',
        templateId: 'modern',
        styles: {
            backgroundColor: '#ec4899',
            textColor: '#ffffff',
            accentColor: '#fef08a',
            useGradient: true,
            gradientColor: '#8b5cf6',
            gradientDirection: 'to-br',
            cardFinish: 'glossy',
            borderRadius: 'pill',
            showChip: false,
            showNfcBadge: true,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        }
    }
];

export const CURATED_PALETTES = [
    { name: 'Space Black', bg: '#121214', text: '#F5F5F7', accent: '#0071E3' },
    { name: 'Pure White', bg: '#FFFFFF', text: '#1D1D1F', accent: '#0071E3' },
    { name: 'Midnight', bg: '#0F172A', text: '#F8FAFC', accent: '#38BDF8' },
    { name: 'Starlight', bg: '#F9F6F0', text: '#292524', accent: '#D97706' },
    { name: 'Deep Emerald', bg: '#064E3B', text: '#ECFDF5', accent: '#34D399' },
    { name: 'Royal Navy', bg: '#1E1B4B', text: '#EEF2FF', accent: '#818CF8' },
    { name: 'Titanium Gold', bg: '#1C1917', text: '#FAFAF9', accent: '#F59E0B' },
    { name: 'Cyber Violet', bg: '#2E1065', text: '#FAF5FF', accent: '#C084FC' },
];

export const FONTS = [
    { name: 'SF Pro / Apple System', value: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' },
    { name: 'Inter (Modern Sans)', value: '"Inter", sans-serif' },
    { name: 'Plus Jakarta Sans', value: '"Plus Jakarta Sans", sans-serif' },
    { name: 'Playfair Display (Luxury Serif)', value: '"Playfair Display", Georgia, serif' },
    { name: 'Georgia (Classic Editorial)', value: 'Georgia, serif' },
    { name: 'JetBrains / Space Mono', value: '"JetBrains Mono", "Courier New", monospace' },
    { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
    { name: 'Times New Roman', value: '"Times New Roman", serif' },
];
