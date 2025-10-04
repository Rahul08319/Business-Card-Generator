export type TemplateId = 'classic' | 'modern' | 'minimalist';

export interface Template {
    id: TemplateId;
    name: string;
    thumbnail: string;
}

export interface CardData {
    name: string;
    title: string;
    company: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    logo?: string;
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
}

export type QrCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrCodeSettings {
    enabled: boolean;
    text: string;
    color: string;
    errorCorrectionLevel: QrCodeErrorCorrectionLevel;
}