import React, { useState, useEffect, useRef } from 'react';
import { CardData, StyleSettings, TemplateId, QrCodeSettings } from '../types';
import { PhoneIcon, MailIcon, GlobeIcon, LocationIcon, ChipIcon, NfcIcon, AtSignIcon } from './icons';
import { getValidityBadgeText, getCurrentYear } from '../utils/yearManager';

declare const QRCode: any;

interface CardPreviewProps {
    cardData: CardData;
    styleSettings: StyleSettings;
    qrCodeSettings: QrCodeSettings;
    templateId: TemplateId;
    logoPreview: string | null;
    isExporting?: boolean;
    cardRef?: React.RefObject<HTMLDivElement | null>;
    onFlipToggle?: () => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({ 
    cardData, 
    styleSettings, 
    qrCodeSettings, 
    templateId, 
    logoPreview,
    isExporting = false,
    cardRef,
    onFlipToggle,
}) => {
    const { name, title, company, tagline, phone, email, website, address, socialHandle } = cardData;
    const { 
        backgroundColor, 
        textColor, 
        accentColor, 
        useGradient, 
        gradientColor, 
        gradientDirection, 
        fontFamily,
        cardFinish,
        borderRadius,
        showChip,
        showNfcBadge,
        cardSide
    } = styleSettings;
    const { enabled: qrEnabled, text: qrText, color: qrColor, errorCorrectionLevel: qrErrorLevel, position: qrPosition } = qrCodeSettings;

    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const internalRef = useRef<HTMLDivElement>(null);
    const activeRef = cardRef || internalRef;

    // Generate QR Code with high resolution
    useEffect(() => {
        if (qrEnabled && qrText && typeof QRCode !== 'undefined') {
            QRCode.toDataURL(qrText, {
                errorCorrectionLevel: qrErrorLevel || 'M',
                width: 240,
                margin: 1,
                color: {
                    dark: qrColor || '#000000',
                    light: '#00000000' // Transparent background
                }
            })
            .then((url: string) => setQrCodeUrl(url))
            .catch(() => setQrCodeUrl(''));
        } else {
            setQrCodeUrl('');
        }
    }, [qrEnabled, qrText, qrColor, qrErrorLevel]);

    // Interactive 3D Card Tilt Tracking
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isExporting || !activeRef.current) return;
        const rect = activeRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((mouseY - centerY) / centerY) * -11; // max 11 deg
        const rotateY = ((mouseX - centerX) / centerX) * 11;

        const glareX = (mouseX / rect.width) * 100;
        const glareY = (mouseY / rect.height) * 100;

        setTilt({ x: rotateX, y: rotateY });
        setGlare({ x: glareX, y: glareY, opacity: 0.35 });
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setGlare({ x: 50, y: 50, opacity: 0 });
        setIsHovered(false);
    };

    // Card Corner Radius Mapping
    const getBorderRadiusClass = () => {
        switch (borderRadius) {
            case 'sharp': return 'rounded-none';
            case 'standard': return 'rounded-xl';
            case 'pill': return 'rounded-[32px]';
            case 'squircle':
            default:
                return 'rounded-[22px]';
        }
    };

    // Dynamic Finish Style
    const getFinishOverlay = () => {
        switch (cardFinish) {
            case 'titanium':
                return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/15 via-transparent to-black/30 backdrop-contrast-125';
            case 'glass':
                return 'backdrop-blur-xl bg-white/10 border border-white/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4)]';
            case 'glossy':
                return 'bg-gradient-to-tr from-white/10 via-transparent to-white/20';
            case 'hologram':
                return 'bg-[linear-gradient(135deg,rgba(255,0,128,0.08)_0%,rgba(0,255,255,0.08)_50%,rgba(255,255,0,0.08)_100%)]';
            case 'matte':
            default:
                return 'shadow-[inset_0_0_20px_rgba(0,0,0,0.06)]';
        }
    };

    // Background Gradient / Solid Mapping
    const backgroundStyle: React.CSSProperties = useGradient
        ? { backgroundImage: `linear-gradient(${gradientDirection.replace('to-', 'to ')}, ${backgroundColor}, ${gradientColor})` }
        : { backgroundColor: backgroundColor };

    const textStyle: React.CSSProperties = { color: textColor };
    const accentStyle: React.CSSProperties = { color: accentColor };
    const accentBgStyle: React.CSSProperties = { backgroundColor: accentColor };

    const logoSrc = logoPreview || cardData.logo;

    const renderQrCode = (extraClass = '') => {
        if (!qrCodeUrl) return null;
        return (
            <div className={`p-1 bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-white/50 ${extraClass}`}>
                <img src={qrCodeUrl} alt="QR Code" className="w-12 h-12 object-contain" />
            </div>
        );
    };

    const renderContactDetails = (dense = false) => (
        <div className={`space-y-1 ${dense ? 'text-[11px]' : 'text-xs'}`} style={textStyle}>
            {phone && (
                <div className="flex items-center space-x-2">
                    <span style={accentStyle}><PhoneIcon /></span>
                    <span className="font-medium tracking-tight opacity-90">{phone}</span>
                </div>
            )}
            {email && (
                <div className="flex items-center space-x-2">
                    <span style={accentStyle}><MailIcon /></span>
                    <span className="font-medium tracking-tight opacity-90">{email}</span>
                </div>
            )}
            {website && (
                <div className="flex items-center space-x-2">
                    <span style={accentStyle}><GlobeIcon /></span>
                    <span className="font-medium tracking-tight opacity-90">{website}</span>
                </div>
            )}
            {address && (
                <div className="flex items-center space-x-2">
                    <span style={accentStyle}><LocationIcon /></span>
                    <span className="font-medium tracking-tight opacity-90 truncate max-w-[200px]">{address}</span>
                </div>
            )}
        </div>
    );

    // Front Template Renderers
    const renderFrontContent = () => {
        switch (templateId) {
            case 'cupertino':
                return (
                    <div className="w-full h-full p-6 flex flex-col justify-between relative z-10">
                        {/* Top Bar: Chip / Logo / NFC */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                {showChip && <ChipIcon />}
                                {logoSrc ? (
                                    <img src={logoSrc} alt="Logo" className="max-h-9 max-w-[85px] object-contain drop-shadow-sm" />
                                ) : (
                                    <div className="flex items-center space-x-1.5 opacity-90" style={textStyle}>
                                        <div className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs" style={accentBgStyle}>
                                            <span className="text-white">{company ? company.charAt(0).toUpperCase() : 'C'}</span>
                                        </div>
                                        <span className="font-semibold text-xs tracking-wider uppercase opacity-80">{company}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                {showNfcBadge && (
                                    <div className="opacity-70 hover:opacity-100 transition-opacity" style={accentStyle}>
                                        <NfcIcon />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Middle: Name & Title */}
                        <div className="my-auto py-1">
                            <h2 className="text-2xl font-semibold tracking-tight leading-tight" style={textStyle}>{name}</h2>
                            <p className="text-xs font-medium tracking-wide uppercase mt-0.5" style={accentStyle}>{title}</p>
                            {tagline && <p className="text-[11px] opacity-75 mt-1 italic" style={textStyle}>{tagline}</p>}
                        </div>

                        {/* Bottom Row: Contact & QR */}
                        <div className="flex items-end justify-between pt-1 border-t border-black/[0.06] dark:border-white/[0.08]">
                            <div>
                                {renderContactDetails(true)}
                            </div>
                            <div className="flex flex-col items-end">
                                {renderQrCode('mb-0.5')}
                                <span className="text-[9px] uppercase tracking-widest font-mono opacity-50 mt-1" style={textStyle}>
                                    {getValidityBadgeText(cardData.issueYear, cardData.validThruYear)}
                                </span>
                            </div>
                        </div>
                    </div>
                );

            case 'executive':
                return (
                    <div className="w-full h-full p-6 flex relative z-10">
                        {/* Left Column */}
                        <div className="w-1/2 pr-4 flex flex-col justify-between">
                            <div>
                                {logoSrc && <img src={logoSrc} alt="Logo" className="max-h-8 mb-3 object-contain" />}
                                <h2 className="text-xl font-bold tracking-tight" style={textStyle}>{name}</h2>
                                <p className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={accentStyle}>{title}</p>
                                <p className="text-xs opacity-75 font-medium mt-1" style={textStyle}>{company}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {showChip && <ChipIcon className="w-8 h-6" />}
                                {showNfcBadge && <span style={accentStyle}><NfcIcon className="w-4 h-4" /></span>}
                            </div>
                        </div>

                        {/* Divider Line */}
                        <div className="w-px h-full my-auto opacity-30" style={accentBgStyle} />

                        {/* Right Column */}
                        <div className="w-1/2 pl-4 flex flex-col justify-between items-end text-right">
                            <div className="w-full flex justify-end">
                                {renderQrCode('mb-2')}
                            </div>
                            <div className="w-full">
                                {renderContactDetails(true)}
                            </div>
                        </div>
                    </div>
                );

            case 'glassmorphism':
                return (
                    <div className="w-full h-full p-6 flex flex-col justify-between relative z-10">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight drop-shadow-sm" style={textStyle}>{name}</h2>
                                <span className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full mt-1 bg-white/20 backdrop-blur-md shadow-sm" style={accentStyle}>
                                    {title}
                                </span>
                            </div>
                            {logoSrc && <img src={logoSrc} alt="Logo" className="max-h-9 max-w-[80px] object-contain drop-shadow" />}
                        </div>

                        <div className="flex items-end justify-between mt-2">
                            <div>
                                <p className="text-sm font-semibold tracking-wide mb-1" style={textStyle}>{company}</p>
                                {renderContactDetails(true)}
                            </div>
                            <div>
                                {renderQrCode()}
                            </div>
                        </div>
                    </div>
                );

            case 'obsidian':
                return (
                    <div className="w-full h-full p-6 flex flex-col justify-between relative z-10">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded border border-white/10" style={accentStyle}>
                                    {company || 'PORTFOLIO PRO'}
                                </span>
                                <h2 className="text-2xl font-bold tracking-tight mt-2" style={textStyle}>{name}</h2>
                                <p className="text-xs tracking-wider uppercase font-medium mt-0.5" style={accentStyle}>{title}</p>
                            </div>
                            {showChip && <ChipIcon />}
                        </div>

                        <div className="flex items-end justify-between pt-2 border-t border-white/10">
                            <div>{renderContactDetails(true)}</div>
                            <div className="flex items-center space-x-2">
                                {renderQrCode()}
                                {showNfcBadge && <span style={accentStyle}><NfcIcon className="w-5 h-5" /></span>}
                            </div>
                        </div>
                    </div>
                );

            case 'modern':
                return (
                    <div className="w-full h-full p-6 flex flex-col justify-between relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight" style={textStyle}>{name}</h2>
                            <p className="text-sm font-semibold mt-0.5" style={accentStyle}>{title}</p>
                            <div className="w-12 h-0.5 my-2" style={accentBgStyle} />
                            <p className="text-sm font-medium opacity-90" style={textStyle}>{company}</p>
                        </div>
                        <div className="flex items-end justify-between">
                            {logoSrc ? <img src={logoSrc} alt="Logo" className="max-h-8 max-w-[70px] object-contain" /> : <div />}
                            <div className="text-right">{renderContactDetails(true)}</div>
                        </div>
                        {renderQrCode('absolute bottom-4 right-4')}
                    </div>
                );

            case 'minimalist':
                return (
                    <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center relative z-10">
                        {logoSrc && <img src={logoSrc} alt="Logo" className="max-h-8 mb-2 object-contain" />}
                        <h2 className="text-xl font-light tracking-widest uppercase" style={textStyle}>{name}</h2>
                        <p className="text-[11px] font-semibold tracking-widest uppercase mt-0.5" style={accentStyle}>{title}</p>
                        <div className="my-2 w-12 h-px" style={accentBgStyle} />
                        <p className="text-xs font-medium opacity-80" style={textStyle}>{company}</p>
                        <p className="text-[11px] mt-1 opacity-75" style={textStyle}>
                            {phone} {phone && email && '•'} {email}
                        </p>
                        {renderQrCode('absolute bottom-3 right-3')}
                    </div>
                );

            case 'classic':
            default:
                return (
                    <div className="w-full h-full p-6 flex relative z-10">
                        <div className="w-2/3 pr-2 flex flex-col justify-between">
                            <div>
                                {logoSrc && <img src={logoSrc} alt="Logo" className="max-h-8 mb-3 object-contain" />}
                                <h2 className="text-xl font-semibold tracking-tight" style={textStyle}>{name}</h2>
                                <p className="text-xs font-medium" style={accentStyle}>{title}</p>
                                <p className="text-xs font-normal mt-1 opacity-80" style={textStyle}>{company}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {showChip && <ChipIcon className="w-8 h-6" />}
                                {renderQrCode()}
                            </div>
                        </div>
                        <div className="w-1/3 flex flex-col justify-end items-end text-right">
                            {renderContactDetails(true)}
                        </div>
                    </div>
                );
        }
    };

    // Realistic Card Back Face (Flip Side)
    const renderBackContent = () => {
        return (
            <div className="w-full h-full flex flex-col justify-between relative z-10">
                {/* Magnetic Stripe / Brushed Bar */}
                <div className="w-full h-11 bg-black/85 mt-4 relative flex items-center px-4">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                {/* Central Brand & NFC Tap Identity */}
                <div className="px-6 flex flex-col items-center justify-center my-auto text-center">
                    {logoSrc ? (
                        <img src={logoSrc} alt="Logo" className="max-h-11 mb-2 object-contain drop-shadow" />
                    ) : (
                        <div className="w-11 h-11 rounded-full flex items-center justify-center mb-1 shadow-md" style={accentBgStyle}>
                            <span className="text-white text-base font-bold">{company ? company.charAt(0).toUpperCase() : '✦'}</span>
                        </div>
                    )}
                    <h3 className="text-base font-bold tracking-tight" style={textStyle}>{company || name}</h3>
                    {tagline && <p className="text-[11px] opacity-75 italic max-w-xs" style={textStyle}>"{tagline}"</p>}

                    {/* NFC Tap Hint */}
                    <div className="flex items-center space-x-1.5 mt-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 text-[10px] font-medium" style={textStyle}>
                        <span style={accentStyle}><NfcIcon className="w-3.5 h-3.5" /></span>
                        <span>Tap to exchange digital contact</span>
                    </div>
                </div>

                {/* Bottom Metadata & Validity Info */}
                <div className="px-6 pb-4 flex items-end justify-between border-t border-black/[0.06] dark:border-white/[0.08] pt-2 text-[10px]">
                    <div className="space-y-0.5" style={textStyle}>
                        {socialHandle && (
                            <div className="flex items-center space-x-1 font-mono opacity-80">
                                <AtSignIcon />
                                <span>{socialHandle}</span>
                            </div>
                        )}
                        <p className="font-mono opacity-60">{website || 'www.cardstudio.me'}</p>
                    </div>

                    <div className="text-right">
                        <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 font-semibold" style={accentStyle}>
                            {getValidityBadgeText(cardData.issueYear, cardData.validThruYear)}
                        </span>
                        <p className="text-[8px] opacity-50 uppercase tracking-widest mt-0.5" style={textStyle}>
                            SECURE BUSINESS ID
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    // Card transform logic
    const isFlipped = cardSide === 'back';
    const transformStyle: React.CSSProperties = isExporting
        ? {}
        : {
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg) scale3d(${isHovered ? 1.025 : 1}, ${isHovered ? 1.025 : 1}, 1)`,
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        };

    return (
        <div className="flex flex-col items-center">
            {/* 3D Perspective Card Wrapper */}
            <div 
                className="perspective-1000 select-none cursor-pointer p-4"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onFlipToggle}
            >
                <div 
                    ref={activeRef as any}
                    style={{
                        ...transformStyle,
                        fontFamily: fontFamily,
                    }}
                    className={`w-[480px] h-[274px] max-w-[90vw] max-h-[55vw] transform-style-3d relative shadow-apple-card hover:shadow-apple-card-hover transition-shadow duration-300 ${getBorderRadiusClass()}`}
                >
                    {/* FRONT FACE */}
                    <div 
                        style={backgroundStyle}
                        className={`absolute inset-0 w-full h-full overflow-hidden backface-hidden ${getBorderRadiusClass()}`}
                    >
                        {/* Finish & Texture Overlay */}
                        <div className={`absolute inset-0 pointer-events-none ${getFinishOverlay()}`} />

                        {/* Interactive Dynamic Specular Glare */}
                        {!isExporting && (
                            <div 
                                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                style={{
                                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 60%)`,
                                    mixBlendMode: 'overlay',
                                }}
                            />
                        )}

                        {/* Front Content */}
                        {renderFrontContent()}
                    </div>

                    {/* BACK FACE (180deg flipped) */}
                    <div 
                        style={backgroundStyle}
                        className={`absolute inset-0 w-full h-full overflow-hidden rotate-y-180 backface-hidden ${getBorderRadiusClass()}`}
                    >
                        {/* Finish Overlay */}
                        <div className={`absolute inset-0 pointer-events-none ${getFinishOverlay()}`} />

                        {/* Dynamic Glare for Back */}
                        {!isExporting && (
                            <div 
                                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                style={{
                                    background: `radial-gradient(circle at ${100 - glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 60%)`,
                                    mixBlendMode: 'overlay',
                                }}
                            />
                        )}

                        {/* Back Content */}
                        {renderBackContent()}
                    </div>
                </div>
            </div>

            {/* Subtle Interactive Instruction Pill */}
            {!isExporting && (
                <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Hover to tilt 3D • Click card or button to flip ({cardSide === 'front' ? 'Front Side' : 'Back Side'})</span>
                </div>
            )}
        </div>
    );
};

export default CardPreview;