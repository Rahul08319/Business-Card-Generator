import React, { useState, useEffect } from 'react';
import { CardData, StyleSettings, TemplateId, QrCodeSettings } from '../types';
import { PhoneIcon, MailIcon, GlobeIcon, LocationIcon } from './icons';

// Declare the QRCode library which is loaded from a CDN script
declare const QRCode: any;

interface CardPreviewProps {
    cardData: CardData;
    styleSettings: StyleSettings;
    qrCodeSettings: QrCodeSettings;
    templateId: TemplateId;
    logoPreview: string | null;
}

const CardPreview: React.FC<CardPreviewProps> = ({ cardData, styleSettings, qrCodeSettings, templateId, logoPreview }) => {
    const { name, title, company, phone, email, website, address } = cardData;
    const { backgroundColor, textColor, accentColor, useGradient, gradientColor, gradientDirection, fontFamily } = styleSettings;
    const { enabled: qrEnabled, text: qrText, color: qrColor, errorCorrectionLevel: qrErrorLevel } = qrCodeSettings;

    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    useEffect(() => {
        if (qrEnabled && qrText) {
            QRCode.toDataURL(qrText, {
                errorCorrectionLevel: qrErrorLevel,
                width: 200, // Generate a larger QR code for better quality when scaled down
                margin: 1,
                color: {
                    dark: qrColor,
                    light: '#0000' // Transparent background
                }
            })
            .then((url: string) => {
                setQrCodeUrl(url);
            })
            .catch((err: any) => {
                console.error("QR Code generation failed:", err);
                setQrCodeUrl('');
            });
        } else {
            setQrCodeUrl('');
        }
    }, [qrEnabled, qrText, qrColor, qrErrorLevel]);


    const backgroundStyle: React.CSSProperties = useGradient
        ? { backgroundImage: `linear-gradient(to ${gradientDirection.split('-')[1]}, ${backgroundColor}, ${gradientColor})` }
        : { backgroundColor: backgroundColor };
    
    const textStyle: React.CSSProperties = { color: textColor };
    const accentStyle: React.CSSProperties = { color: accentColor };
    const accentBgStyle: React.CSSProperties = { backgroundColor: accentColor };

    const renderContactInfo = () => (
        <div className="text-xs space-y-1" style={textStyle}>
            {phone && <div className="flex items-center"><PhoneIcon /> <span className="ml-2">{phone}</span></div>}
            {email && <div className="flex items-center"><MailIcon /> <span className="ml-2">{email}</span></div>}
            {website && <div className="flex items-center"><GlobeIcon /> <span className="ml-2">{website}</span></div>}
            {address && <div className="flex items-center"><LocationIcon /> <span className="ml-2">{address}</span></div>}
        </div>
    );
    
    const logoSrc = logoPreview || cardData.logo;

    const renderQrCode = (className: string) => {
        if (!qrCodeUrl) return null;
        return <img src={qrCodeUrl} alt="QR Code" className={`absolute object-contain ${className}`} />;
    };

    const renderTemplate = () => {
        switch (templateId) {
            case 'modern':
                return (
                    <div style={backgroundStyle} className="w-full h-full p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold" style={textStyle}>{name}</h2>
                            <p className="text-md" style={accentStyle}>{title}</p>
                            <hr className="my-2" style={{ borderColor: accentColor }} />
                            <p className="text-lg font-semibold" style={textStyle}>{company}</p>
                        </div>
                        <div className="self-end text-right">
                           {renderContactInfo()}
                        </div>
                         {logoSrc && <img src={logoSrc} alt="logo" className="absolute bottom-4 left-4 max-h-12 max-w-[80px] object-contain" />}
                         {renderQrCode('w-16 h-16 bottom-4 right-4')}
                    </div>
                );
            case 'minimalist':
                return (
                     <div style={backgroundStyle} className="w-full h-full p-6 flex flex-col items-center justify-center text-center">
                        {logoSrc && <img src={logoSrc} alt="logo" className="max-h-12 mb-3 object-contain" />}
                        <h2 className="text-2xl font-light tracking-wider" style={textStyle}>{name.toUpperCase()}</h2>
                        <p className="text-sm font-semibold tracking-widest" style={accentStyle}>{title.toUpperCase()}</p>
                        <div className="my-3 w-16 h-px" style={accentBgStyle}></div>
                        <p className="text-xs" style={textStyle}>{company}</p>
                        <p className="text-xs mt-2" style={textStyle}>{phone} | {email}</p>
                        {renderQrCode('w-12 h-12 absolute bottom-2 right-2')}
                    </div>
                );
            case 'classic':
            default:
                return (
                    <div style={backgroundStyle} className="w-full h-full p-6 flex">
                        <div className="w-2/3">
                            {logoSrc && <img src={logoSrc} alt="logo" className="max-h-12 mb-4 object-contain" />}
                            <h2 className="text-2xl font-semibold" style={textStyle}>{name}</h2>
                            <p className="text-md" style={accentStyle}>{title}</p>
                            <p className="text-sm font-medium mt-1" style={textStyle}>{company}</p>
                             {renderQrCode('w-16 h-16 absolute bottom-4 left-4')}
                        </div>
                        <div className="w-1/3 flex flex-col justify-end items-end text-right">
                            {renderContactInfo()}
                        </div>
                    </div>
                );
        }
    };


    return (
        <div className="w-[350px] h-[200px] shadow-lg rounded-xl overflow-hidden relative" style={{ fontFamily: fontFamily }}>
           {renderTemplate()}
        </div>
    );
};

export default CardPreview;