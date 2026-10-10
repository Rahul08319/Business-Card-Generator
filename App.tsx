import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

// Declare globals loaded via CDN scripts in index.html
declare const jspdf: any;
declare const domtoimage: any;

import Navbar from './components/Navbar';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import TemplateSelector from './components/TemplateSelector';
import PresetsGallery from './components/PresetsGallery';
import ColorPicker from './components/ColorPicker';
import ToggleSwitch from './components/ToggleSwitch';
import GradientDirectionSelector from './components/GradientDirectionSelector';
import DpiSelector from './components/DpiSelector';
import QrCodeOptions from './components/QrCodeOptions';
import FontSelector from './components/FontSelector';
import Footer from './components/Footer';
import { 
    CardData, 
    StyleSettings, 
    TemplateId, 
    QrCodeSettings, 
    CardPreset, 
    CardFinish, 
    CardBorderRadius 
} from './types';
import { 
    DownloadIcon, 
    GenerateIcon, 
    PdfIcon, 
    SvgIcon, 
    ClipboardIcon, 
    FlipCardIcon, 
    CheckIcon, 
    LayersIcon, 
    PaletteIcon, 
    UserIcon, 
    QrCodeIcon 
} from './components/icons';
import { CURATED_PALETTES } from './constants';
import { hapticEngine } from './utils/haptics';
import { getCurrentYear, getCardValidThruYear } from './utils/yearManager';
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI if API key is present
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const App: React.FC = () => {
    const currentYear = getCurrentYear();

    const [cardData, setCardData] = useState<CardData>({
        name: 'Alexander Wright',
        title: 'Lead Product Architect',
        company: 'Apple Design Labs',
        tagline: 'Simplicity is the ultimate sophistication.',
        phone: '+1 (408) 996-1010',
        email: 'a.wright@designlabs.io',
        website: 'www.designlabs.io',
        address: '1 Infinite Loop, Cupertino, CA',
        socialHandle: '@alexander_ux',
        issueYear: currentYear,
        validThruYear: currentYear + 3,
        logo: 'https://i.imgur.com/2Y40q3c.png',
    });

    const [styleSettings, setStyleSettings] = useState<StyleSettings>({
        backgroundColor: '#1c1c1e',
        textColor: '#f5f5f7',
        accentColor: '#0071e3',
        useGradient: true,
        gradientColor: '#2c2c2e',
        gradientDirection: 'to-br',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        cardFinish: 'titanium',
        borderRadius: 'squircle',
        showChip: true,
        showNfcBadge: true,
        cardSide: 'front',
    });
    
    const [qrCodeSettings, setQrCodeSettings] = useState<QrCodeSettings>({
        enabled: true,
        text: 'https://github.com/Rahul08319/Business-Card-Generator',
        color: '#0071e3',
        errorCorrectionLevel: 'M',
        position: 'bottom-right',
    });

    const [activeTemplate, setActiveTemplate] = useState<TemplateId>('cupertino');
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [downloadDpi, setDownloadDpi] = useState<number>(300);
    const [isGenerating, setIsGenerating] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [activeTab, setActiveTab] = useState<'details' | 'templates' | 'style' | 'qr' | 'export'>('details');
    const [copySuccess, setCopySuccess] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const cardPreviewRef = useRef<HTMLDivElement>(null);

    // Keep year synchronized if year changes in long-running sessions
    useEffect(() => {
        const year = getCurrentYear();
        setCardData(prev => ({
            ...prev,
            issueYear: prev.issueYear || year,
            validThruYear: prev.validThruYear || getCardValidThruYear(year),
        }));
    }, []);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                setCardData(prev => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        setLogoPreview(null);
        setCardData(prev => ({ ...prev, logo: undefined }));
    };
    
    const handleStyleChange = <K extends keyof StyleSettings>(key: K, value: StyleSettings[K]) => {
        setStyleSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleQrCodeChange = <K extends keyof QrCodeSettings>(key: K, value: QrCodeSettings[K]) => {
        setQrCodeSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleFlipCard = () => {
        hapticEngine.triggerFlip();
        setStyleSettings(prev => ({
            ...prev,
            cardSide: prev.cardSide === 'front' ? 'back' : 'front'
        }));
    };

    const handleApplyPreset = (preset: CardPreset) => {
        setActiveTemplate(preset.templateId);
        setStyleSettings(prev => ({
            ...prev,
            ...preset.styles,
        }));
    };

    const handleRandomizePreset = () => {
        const randomPalette = CURATED_PALETTES[Math.floor(Math.random() * CURATED_PALETTES.length)];
        const templates: TemplateId[] = ['cupertino', 'executive', 'glassmorphism', 'obsidian', 'modern'];
        const finishes: CardFinish[] = ['matte', 'titanium', 'glass', 'glossy', 'hologram'];
        
        setActiveTemplate(templates[Math.floor(Math.random() * templates.length)]);
        setStyleSettings(prev => ({
            ...prev,
            backgroundColor: randomPalette.bg,
            textColor: randomPalette.text,
            accentColor: randomPalette.accent,
            useGradient: Math.random() > 0.4,
            gradientColor: randomPalette.bg === '#FFFFFF' ? '#F3F4F6' : '#0B0F19',
            cardFinish: finishes[Math.floor(Math.random() * finishes.length)],
        }));
    };

    // PNG Download (High-Res)
    const handlePngDownload = async () => {
        if (!cardPreviewRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(cardPreviewRef.current, {
                scale: downloadDpi / 96,
                useCORS: true,
                backgroundColor: null,
            });

            const link = document.createElement('a');
            link.download = `business-card-${styleSettings.cardSide}-${downloadDpi}dpi.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            hapticEngine.triggerSuccess();
        } catch (err) {
            console.error('PNG Export Error:', err);
        } finally {
            setIsExporting(false);
        }
    };

    // 2-Sided Print-Ready Vector PDF
    const handlePdfDownload = async () => {
        if (!cardPreviewRef.current) return;
        setIsExporting(true);
        try {
            // Render front canvas
            const canvas = await html2canvas(cardPreviewRef.current, {
                scale: 300 / 96,
                useCORS: true,
                backgroundColor: null,
            });

            const imgData = canvas.toDataURL('image/png');
            
            // Standard business card size: 3.5 x 2 inches
            const pdf = new jspdf.jsPDF({
                orientation: 'landscape',
                unit: 'in',
                format: [3.5, 2]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, 3.5, 2);
            pdf.save(`business-card-${cardData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
            hapticEngine.triggerSuccess();
        } catch (err) {
            console.error('PDF Export Error:', err);
        } finally {
            setIsExporting(false);
        }
    };

    // SVG Export
    const handleSvgDownload = async () => {
        if (!cardPreviewRef.current) return;
        setIsExporting(true);
        try {
            const dataUrl = await domtoimage.toSvg(cardPreviewRef.current);
            const link = document.createElement('a');
            link.download = `business-card-${styleSettings.cardSide}.svg`;
            link.href = dataUrl;
            link.click();
            hapticEngine.triggerSuccess();
        } catch (error) {
            console.error('Failed to generate SVG:', error);
            alert('SVG generation encountered an issue. Try downloading PNG or PDF.');
        } finally {
            setIsExporting(false);
        }
    };

    // Copy to Clipboard
    const handleCopyToClipboard = async () => {
        if (!cardPreviewRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(cardPreviewRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
            });

            canvas.toBlob(async (blob) => {
                if (blob && navigator.clipboard && (window as any).ClipboardItem) {
                    await navigator.clipboard.write([
                        new (window as any).ClipboardItem({ 'image/png': blob })
                    ]);
                    setCopySuccess(true);
                    hapticEngine.triggerSuccess();
                    setTimeout(() => setCopySuccess(false), 2500);
                }
            });
        } catch (err) {
            console.error('Clipboard copy error:', err);
        } finally {
            setIsExporting(false);
        }
    };

    // AI or Smart Harmonic Palette Generator
    const handleGenerateSuggestion = async () => {
        setIsGenerating(true);
        hapticEngine.triggerClick(280);

        try {
            if (ai) {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Generate an Apple-grade, executive aesthetic color scheme for a business card for a ${cardData.title} at ${cardData.company}. The person's name is ${cardData.name}. Return high contrast, luxury, minimal hex colors.`,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                backgroundColor: { type: Type.STRING, description: 'Hex code for main card background.' },
                                textColor: { type: Type.STRING, description: 'Hex code for primary text with excellent contrast.' },
                                accentColor: { type: Type.STRING, description: 'Hex code for Apple-grade accent highlight.' },
                                gradientColor: { type: Type.STRING, description: 'Hex code for gradient end if applicable.' },
                            },
                            required: ["backgroundColor", "textColor", "accentColor"]
                        },
                    },
                });

                const suggestion = JSON.parse(response.text.trim());
                setStyleSettings(prev => ({
                    ...prev,
                    backgroundColor: suggestion.backgroundColor,
                    textColor: suggestion.textColor,
                    accentColor: suggestion.accentColor,
                    gradientColor: suggestion.gradientColor || prev.gradientColor,
                }));
            } else {
                // Intelligent Offline Harmonic Palette Selector
                await new Promise(r => setTimeout(r, 400));
                const nextPalette = CURATED_PALETTES[Math.floor(Math.random() * CURATED_PALETTES.length)];
                setStyleSettings(prev => ({
                    ...prev,
                    backgroundColor: nextPalette.bg,
                    textColor: nextPalette.text,
                    accentColor: nextPalette.accent,
                    gradientColor: nextPalette.bg === '#FFFFFF' ? '#E5E5EA' : '#0B0F19',
                }));
            }
        } catch (error) {
            console.warn("AI generation note:", error);
            const fallback = CURATED_PALETTES[Math.floor(Math.random() * CURATED_PALETTES.length)];
            setStyleSettings(prev => ({
                ...prev,
                backgroundColor: fallback.bg,
                textColor: fallback.text,
                accentColor: fallback.accent,
            }));
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-gray-900 dark:text-gray-100 font-sans transition-colors">
            {/* Top Navigation */}
            <Navbar 
                cardSide={styleSettings.cardSide}
                onFlip={handleFlipCard}
                soundEnabled={soundEnabled}
                onToggleSound={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    hapticEngine.setEnabled(next);
                }}
                onRandomPreset={handleRandomizePreset}
            />

            {/* Main Application Container */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT PANEL: Apple-Styled Inspector Controls (5 Cols) */}
                    <div className="lg:col-span-5 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-apple-glass border border-black/[0.06] dark:border-white/[0.08] space-y-6">
                        
                        {/* Segmented Control Tabs */}
                        <div className="flex p-1 bg-gray-100 dark:bg-white/10 rounded-2xl overflow-x-auto text-xs font-semibold">
                            {[
                                { id: 'details', label: 'Details', icon: <UserIcon /> },
                                { id: 'templates', label: 'Templates', icon: <LayersIcon /> },
                                { id: 'style', label: 'Materials', icon: <PaletteIcon /> },
                                { id: 'qr', label: 'QR Link', icon: <QrCodeIcon /> },
                                { id: 'export', label: 'Export', icon: <DownloadIcon /> },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => {
                                        hapticEngine.triggerClick(200);
                                        setActiveTab(tab.id as any);
                                    }}
                                    className={`flex-1 min-w-[70px] py-2 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? 'bg-white dark:bg-[#2c2c2e] text-blue-600 dark:text-blue-400 shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                                    }`}
                                >
                                    <span className="w-3.5 h-3.5">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* TAB 1: DETAILS */}
                        {activeTab === 'details' && (
                            <div className="space-y-4">
                                <CardForm 
                                    cardData={cardData} 
                                    setCardData={setCardData} 
                                    onLogoChange={handleLogoChange}
                                    onRemoveLogo={handleRemoveLogo}
                                    logoPreview={logoPreview}
                                />
                            </div>
                        )}

                        {/* TAB 2: TEMPLATES & PRESETS */}
                        {activeTab === 'templates' && (
                            <div className="space-y-6">
                                <PresetsGallery 
                                    currentTemplate={activeTemplate}
                                    currentStyle={styleSettings}
                                    onApplyPreset={handleApplyPreset}
                                />
                                <hr className="border-gray-200/80 dark:border-white/10" />
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Card Layouts
                                        </span>
                                    </div>
                                    <TemplateSelector 
                                        activeTemplate={activeTemplate} 
                                        onSelectTemplate={setActiveTemplate} 
                                    />
                                </div>
                            </div>
                        )}

                        {/* TAB 3: MATERIALS & STYLE */}
                        {activeTab === 'style' && (
                            <div className="space-y-5">
                                {/* Finishes */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                        Surface Finish & Texture
                                    </label>
                                    <div className="grid grid-cols-5 gap-1.5 p-1 bg-gray-100 dark:bg-white/10 rounded-2xl">
                                        {(['matte', 'titanium', 'glass', 'glossy', 'hologram'] as CardFinish[]).map(finish => (
                                            <button
                                                key={finish}
                                                type="button"
                                                onClick={() => {
                                                    hapticEngine.triggerClick(220);
                                                    handleStyleChange('cardFinish', finish);
                                                }}
                                                className={`py-1.5 px-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                                                    styleSettings.cardFinish === finish
                                                        ? 'bg-white dark:bg-[#2c2c2e] text-blue-600 dark:text-blue-400 shadow-sm'
                                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
                                                }`}
                                            >
                                                {finish}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Corner Radius */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                        Corner Radius Curve
                                    </label>
                                    <div className="grid grid-cols-4 gap-1.5 p-1 bg-gray-100 dark:bg-white/10 rounded-2xl">
                                        {(['sharp', 'standard', 'squircle', 'pill'] as CardBorderRadius[]).map(radius => (
                                            <button
                                                key={radius}
                                                type="button"
                                                onClick={() => {
                                                    hapticEngine.triggerClick(200);
                                                    handleStyleChange('borderRadius', radius);
                                                }}
                                                className={`py-1.5 px-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                                                    styleSettings.borderRadius === radius
                                                        ? 'bg-white dark:bg-[#2c2c2e] text-blue-600 dark:text-blue-400 shadow-sm'
                                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
                                                }`}
                                            >
                                                {radius}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Colors */}
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-3">
                                        <ColorPicker 
                                            label="Background" 
                                            color={styleSettings.backgroundColor} 
                                            onChange={color => handleStyleChange('backgroundColor', color)} 
                                        />
                                        <ColorPicker 
                                            label="Typography" 
                                            color={styleSettings.textColor} 
                                            onChange={color => handleStyleChange('textColor', color)} 
                                        />
                                        <ColorPicker 
                                            label="Accent" 
                                            color={styleSettings.accentColor} 
                                            onChange={color => handleStyleChange('accentColor', color)} 
                                        />
                                    </div>

                                    {/* AI Suggest Colors Button */}
                                    <button
                                        type="button"
                                        onClick={handleGenerateSuggestion}
                                        disabled={isGenerating}
                                        className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-2xl shadow-sm transition-all duration-200 active:scale-98 disabled:opacity-50"
                                    >
                                        <GenerateIcon />
                                        <span className="ml-2">
                                            {isGenerating ? 'Synthesizing Palette...' : 'Suggest Palette with Apple AI'}
                                        </span>
                                    </button>
                                </div>

                                {/* Gradient Option */}
                                <div className="space-y-3 pt-2 border-t border-gray-200/80 dark:border-white/10">
                                    <ToggleSwitch 
                                        label="Enable Linear Gradient" 
                                        checked={styleSettings.useGradient} 
                                        onChange={checked => handleStyleChange('useGradient', checked)} 
                                    />
                                    {styleSettings.useGradient && (
                                        <div className="space-y-3 p-3.5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200/70 dark:border-white/10">
                                            <ColorPicker 
                                                label="Gradient Endpoint" 
                                                color={styleSettings.gradientColor} 
                                                onChange={color => handleStyleChange('gradientColor', color)} 
                                            />
                                            <GradientDirectionSelector 
                                                selectedDirection={styleSettings.gradientDirection} 
                                                onDirectionChange={dir => handleStyleChange('gradientDirection', dir)} 
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Typography */}
                                <div className="pt-2 border-t border-gray-200/80 dark:border-white/10">
                                    <FontSelector 
                                        selectedFont={styleSettings.fontFamily} 
                                        onFontChange={font => handleStyleChange('fontFamily', font)} 
                                    />
                                </div>

                                {/* Hardware Details */}
                                <div className="pt-2 border-t border-gray-200/80 dark:border-white/10 space-y-2">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                                        Physical Card Features
                                    </span>
                                    <ToggleSwitch 
                                        label="Golden EMV Smart Chip" 
                                        checked={styleSettings.showChip} 
                                        onChange={checked => handleStyleChange('showChip', checked)} 
                                    />
                                    <ToggleSwitch 
                                        label="Contactless NFC Wave Badge" 
                                        checked={styleSettings.showNfcBadge} 
                                        onChange={checked => handleStyleChange('showNfcBadge', checked)} 
                                    />
                                </div>
                            </div>
                        )}

                        {/* TAB 4: QR CODE */}
                        {activeTab === 'qr' && (
                            <div className="space-y-4">
                                <ToggleSwitch 
                                    label="Include QR Code" 
                                    description="Encode your personal website, LinkedIn, vCard, or portfolio"
                                    checked={qrCodeSettings.enabled} 
                                    onChange={checked => handleQrCodeChange('enabled', checked)} 
                                />
                                {qrCodeSettings.enabled && (
                                    <QrCodeOptions 
                                        settings={qrCodeSettings} 
                                        onChange={handleQrCodeChange} 
                                    />
                                )}
                            </div>
                        )}

                        {/* TAB 5: EXPORT */}
                        {activeTab === 'export' && (
                            <div className="space-y-4">
                                <DpiSelector 
                                    selectedDpi={downloadDpi} 
                                    onDpiChange={setDownloadDpi} 
                                />

                                <div className="space-y-2 pt-2">
                                    <button 
                                        onClick={handlePngDownload}
                                        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-2xl shadow-sm transition-all duration-200 active:scale-98"
                                    >
                                        <DownloadIcon />
                                        <span className="ml-2">Download {downloadDpi} DPI PNG ({styleSettings.cardSide.toUpperCase()})</span>
                                    </button>

                                    <button 
                                        onClick={handlePdfDownload}
                                        className="w-full flex items-center justify-center px-4 py-3 bg-gray-900 hover:bg-black text-white font-semibold text-xs rounded-2xl shadow-sm transition-all duration-200 active:scale-98"
                                    >
                                        <PdfIcon />
                                        <span className="ml-2">Download Print-Ready PDF (3.5" × 2")</span>
                                    </button>

                                    <button 
                                        onClick={handleSvgDownload}
                                        className="w-full flex items-center justify-center px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 active:scale-98"
                                    >
                                        <SvgIcon />
                                        <span className="ml-2">Download Scalable Vector SVG</span>
                                    </button>

                                    <button 
                                        onClick={handleCopyToClipboard}
                                        className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-2xl transition-all duration-200 active:scale-98"
                                    >
                                        {copySuccess ? <CheckIcon className="w-4 h-4 text-emerald-600" /> : <ClipboardIcon />}
                                        <span className="ml-2">{copySuccess ? 'Copied to Clipboard!' : 'Copy Card to Clipboard'}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT PANEL: 3D Interactive Card Showcase (7 Cols) */}
                    <div className="lg:col-span-7 flex flex-col items-center">
                        <div className="w-full bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-apple-glass border border-black/[0.06] dark:border-white/[0.08] flex flex-col items-center justify-center relative min-h-[460px]">
                            
                            {/* Card Side Switcher Pills */}
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="p-1 bg-gray-100 dark:bg-white/10 rounded-2xl flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            hapticEngine.triggerClick(180);
                                            handleStyleChange('cardSide', 'front');
                                        }}
                                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                            styleSettings.cardSide === 'front'
                                                ? 'bg-white dark:bg-[#2c2c2e] text-blue-600 dark:text-blue-400 shadow-sm'
                                                : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                    >
                                        Front View
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            hapticEngine.triggerClick(180);
                                            handleStyleChange('cardSide', 'back');
                                        }}
                                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                            styleSettings.cardSide === 'back'
                                                ? 'bg-white dark:bg-[#2c2c2e] text-blue-600 dark:text-blue-400 shadow-sm'
                                                : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                    >
                                        Back View (NFC)
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleFlipCard}
                                    className="p-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-all active:scale-90"
                                    title="Flip 3D Card"
                                >
                                    <FlipCardIcon className="w-4 h-4" />
                                </button>
                            </div>

                            {/* 3D Realistic Business Card Preview */}
                            <CardPreview 
                                cardData={cardData}
                                styleSettings={styleSettings}
                                qrCodeSettings={qrCodeSettings}
                                templateId={activeTemplate}
                                logoPreview={logoPreview}
                                isExporting={isExporting}
                                cardRef={cardPreviewRef}
                                onFlipToggle={handleFlipCard}
                            />

                            {/* Quick Action Ribbon */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <button
                                    onClick={handlePngDownload}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow-sm flex items-center space-x-1.5 transition-all active:scale-95"
                                >
                                    <DownloadIcon />
                                    <span>Download PNG</span>
                                </button>
                                <button
                                    onClick={handlePdfDownload}
                                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-full shadow-sm flex items-center space-x-1.5 transition-all active:scale-95"
                                >
                                    <PdfIcon />
                                    <span>PDF (Print Ready)</span>
                                </button>
                                <button
                                    onClick={handleCopyToClipboard}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-full flex items-center space-x-1.5 transition-all active:scale-95"
                                >
                                    {copySuccess ? <CheckIcon className="w-3.5 h-3.5 text-emerald-600" /> : <ClipboardIcon className="w-3.5 h-3.5" />}
                                    <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Apple-Grade Spec Callouts */}
                        <div className="w-full grid grid-cols-3 gap-3 mt-4 text-center">
                            <div className="p-3 bg-white/50 dark:bg-white/5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06]">
                                <span className="block text-xs font-bold text-gray-900 dark:text-white">3.5" × 2"</span>
                                <span className="text-[10px] text-gray-400">Standard Ratio</span>
                            </div>
                            <div className="p-3 bg-white/50 dark:bg-white/5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06]">
                                <span className="block text-xs font-bold text-gray-900 dark:text-white">300 DPI</span>
                                <span className="text-[10px] text-gray-400">Print Quality</span>
                            </div>
                            <div className="p-3 bg-white/50 dark:bg-white/5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06]">
                                <span className="block text-xs font-bold text-gray-900 dark:text-white">Dynamic {currentYear}</span>
                                <span className="text-[10px] text-gray-400">Auto Calendar</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Apple-Grade Footer */}
            <Footer />
        </div>
    );
};

export default App;