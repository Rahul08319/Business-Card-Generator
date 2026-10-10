export type TemplateId = 'cupertino' | 'executive' | 'glassmorphism' | 'obsidian' | 'classic' | 'modern' | 'minimalist';

export type CardFinish = 'matte' | 'titanium' | 'glass' | 'glossy' | 'hologram';
export type CardBorderRadius = 'sharp' | 'standard' | 'squircle' | 'pill';
export type CardOrientation = 'landscape' | 'portrait';

export interface Template {
    id: TemplateId;
    name: string;
    description: string;
    category: 'Apple' | 'Executive' | 'Creative' | 'Classic';
    thumbnailSvg: string;
}

export interface CardData {
    name: string;
    title: string;
    company: string;
    tagline?: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    socialHandle?: string;
    logo?: string;
    issueYear?: number;
    validThruYear?: number;
}

export type GradientDirection = 'to-t' | 'to-tr' | 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l' | 'to-tl';

export interface StyleSettings {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    useGradient: boolean;
    gradientColor: string;
    gradientDirection: GradientDirection;
    fontFamily: string;
    cardFinish: CardFinish;
    borderRadius: CardBorderRadius;
    showChip: boolean;
    showNfcBadge: boolean;
    cardSide: 'front' | 'back';
}

export type QrCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrCodeSettings {
    enabled: boolean;
    text: string;
    color: string;
    errorCorrectionLevel: QrCodeErrorCorrectionLevel;
    position: 'bottom-right' | 'bottom-left' | 'top-right';
}

export interface CardPreset {
    id: string;
    name: string;
    description: string;
    templateId: TemplateId;
    styles: Partial<StyleSettings>;
}