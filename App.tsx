import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
// The jsPDF and dom-to-image libraries are loaded via a script tag in index.html, so we can access them from the window object.
declare const jspdf: any;
declare const domtoimage: any;

import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import TemplateSelector from './components/TemplateSelector';
import ColorPicker from './components/ColorPicker';
import ToggleSwitch from './components/ToggleSwitch';
import GradientDirectionSelector from './components/GradientDirectionSelector';
import DpiSelector from './components/DpiSelector';
import QrCodeOptions from './components/QrCodeOptions';
import FontSelector from './components/FontSelector';
import { CardData, StyleSettings, TemplateId, QrCodeSettings } from './types';
import { DownloadIcon, GenerateIcon, PdfIcon, SvgIcon } from './components/icons';
// Fix: Import GoogleGenAI and Type from @google/genai as per guidelines.
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Initialize GoogleGenAI with API key from process.env.API_KEY.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const App: React.FC = () => {
    const [cardData, setCardData] = useState<CardData>({
        name: 'Jane Doe',
        title: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        phone: '+1 (555) 123-4567',
        email: 'jane.doe@example.com',
        website: 'www.example.com',
        address: '123 Innovation Drive, Tech City',
        logo: 'https://i.imgur.com/2Y40q3c.png',
    });

    const [styleSettings, setStyleSettings] = useState<StyleSettings>({
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        accentColor: '#3b82f6',
        useGradient: false,
        gradientColor: '#93c5fd',
        gradientDirection: 'to-br',
        fontFamily: 'Arial, sans-serif',
    });
    
    const [qrCodeSettings, setQrCodeSettings] = useState<QrCodeSettings>({
        enabled: false,
        text: 'https://www.example.com',
        color: '#000000',
        errorCorrectionLevel: 'M',
    });

    const [activeTemplate, setActiveTemplate] = useState<TemplateId>('classic');
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [downloadDpi, setDownloadDpi] = useState(300);
    const [isGenerating, setIsGenerating] = useState(false);

    const cardPreviewRef = useRef<HTMLDivElement>(null);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                setCardData(prev => ({...prev, logo: reader.result as string}));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleStyleChange = <K extends keyof StyleSettings>(key: K, value: StyleSettings[K]) => {
        setStyleSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleQrCodeChange = <K extends keyof QrCodeSettings>(key: K, value: QrCodeSettings[K]) => {
        setQrCodeSettings(prev => ({ ...prev, [key]: value }));
    };

    const handlePngDownload = async () => {
        if (!cardPreviewRef.current) return;
        
        const canvas = await html2canvas(cardPreviewRef.current, {
            scale: downloadDpi / 96, // Adjust scale for DPI
            useCORS: true,
            backgroundColor: null,
        });

        const link = document.createElement('a');
        link.download = `business-card-${downloadDpi}dpi.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const handlePdfDownload = async () => {
        if (!cardPreviewRef.current) return;

        // Use a high scale for better PDF quality
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
        pdf.save('business-card.pdf');
    };

    const handleSvgDownload = async () => {
        if (!cardPreviewRef.current) return;
        try {
            const dataUrl = await domtoimage.toSvg(cardPreviewRef.current);
            const link = document.createElement('a');
            link.download = 'business-card.svg';
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to generate SVG:', error);
            alert('An error occurred while generating the SVG file.');
        }
    };

    const handleGenerateSuggestion = async () => {
        setIsGenerating(true);
        try {
            // Fix: Use ai.models.generateContent to call the Gemini API.
            const response = await ai.models.generateContent({
                // Fix: Use 'gemini-2.5-flash' model.
                model: "gemini-2.5-flash",
                contents: `Generate a color scheme for a business card for a ${cardData.title} at ${cardData.company}. Consider modern design trends. The person's name is ${cardData.name}.`,
                // Fix: Configure for JSON output using responseMimeType and responseSchema.
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            backgroundColor: { type: Type.STRING, description: 'A hex code for the main background color.' },
                            textColor: { type: Type.STRING, description: 'A hex code for the main text color, ensuring good contrast with the background.' },
                            accentColor: { type: Type.STRING, description: 'A hex code for an accent color for highlights or secondary text.' },
                        },
                        required: ["backgroundColor", "textColor", "accentColor"]
                    },
                },
            });

            // Fix: Extract JSON string from response.text.
            const jsonStr = response.text.trim();
            const suggestion = JSON.parse(jsonStr);

            setStyleSettings(prev => ({
                ...prev,
                backgroundColor: suggestion.backgroundColor,
                textColor: suggestion.textColor,
                accentColor: suggestion.accentColor,
            }));
        } catch (error) {
            console.error("Error generating color suggestion:", error);
            alert("Failed to generate color suggestions. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">AI Business Card Generator</h1>
                    <p className="text-lg text-gray-600 mt-2">Create and customize your professional business card in seconds.</p>
                </header>
                
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls Column */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Enter Your Details</h2>
                            <CardForm cardData={cardData} setCardData={setCardData} onLogoChange={handleLogoChange} />
                        </div>
                        <hr />
                         <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Choose a Template</h2>
                            <TemplateSelector activeTemplate={activeTemplate} onSelectTemplate={setActiveTemplate} />
                        </div>
                        <hr />
                         <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Customize Style</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <ColorPicker label="Background" color={styleSettings.backgroundColor} onChange={color => handleStyleChange('backgroundColor', color)} />
                                    <ColorPicker label="Text" color={styleSettings.textColor} onChange={color => handleStyleChange('textColor', color)} />
                                    <ColorPicker label="Accent" color={styleSettings.accentColor} onChange={color => handleStyleChange('accentColor', color)} />
                                </div>
                                <FontSelector 
                                    selectedFont={styleSettings.fontFamily} 
                                    onFontChange={font => handleStyleChange('fontFamily', font)} 
                                />
                                 <button
                                    onClick={handleGenerateSuggestion}
                                    disabled={isGenerating}
                                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200"
                                >
                                    <GenerateIcon />
                                    <span className="ml-2">{isGenerating ? 'Generating...' : 'Suggest Colors with AI'}</span>
                                </button>
                                <ToggleSwitch label="Use Gradient" checked={styleSettings.useGradient} onChange={checked => handleStyleChange('useGradient', checked)} />
                                {styleSettings.useGradient && (
                                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                                         <ColorPicker label="Gradient End" color={styleSettings.gradientColor} onChange={color => handleStyleChange('gradientColor', color)} />
                                         <GradientDirectionSelector selectedDirection={styleSettings.gradientDirection} onDirectionChange={dir => handleStyleChange('gradientDirection', dir)} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Add QR Code</h2>
                            <div className="space-y-4">
                                <ToggleSwitch label="Enable QR Code" checked={qrCodeSettings.enabled} onChange={checked => handleQrCodeChange('enabled', checked)} />
                                {qrCodeSettings.enabled && (
                                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                                        <QrCodeOptions settings={qrCodeSettings} onChange={handleQrCodeChange} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Preview Column */}
                    <div className="lg:col-span-2 flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md">
                        <div ref={cardPreviewRef}>
                            <CardPreview 
                                cardData={cardData}
                                styleSettings={styleSettings}
                                qrCodeSettings={qrCodeSettings}
                                templateId={activeTemplate}
                                logoPreview={logoPreview}
                            />
                        </div>
                        <div className="mt-8 w-full max-w-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">5. Download Your Card</h2>
                             <div className="space-y-4">
                                <div>
                                    <DpiSelector selectedDpi={downloadDpi} onDpiChange={setDownloadDpi} />
                                    <button 
                                        onClick={handlePngDownload}
                                        className="w-full mt-2 flex items-center justify-center px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-all duration-200"
                                    >
                                        <DownloadIcon />
                                        <span className="ml-2">Download PNG</span>
                                    </button>
                                </div>
                                <button 
                                    onClick={handlePdfDownload}
                                    className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-all duration-200"
                                >
                                    <PdfIcon />
                                    <span className="ml-2">Download PDF</span>
                                </button>
                                <button 
                                    onClick={handleSvgDownload}
                                    className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-700 transition-all duration-200"
                                >
                                    <SvgIcon />
                                    <span className="ml-2">Download SVG</span>
                                </button>
                             </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;