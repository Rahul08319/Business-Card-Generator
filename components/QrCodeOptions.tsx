import React from 'react';
import { QrCodeSettings, QrCodeErrorCorrectionLevel } from '../types';
import ColorPicker from './ColorPicker';
import { hapticEngine } from '../utils/haptics';

interface QrCodeOptionsProps {
    settings: QrCodeSettings;
    onChange: <K extends keyof QrCodeSettings>(key: K, value: QrCodeSettings[K]) => void;
}

const ERROR_CORRECTION_LEVELS: { value: QrCodeErrorCorrectionLevel, label: string }[] = [
    { value: 'L', label: 'Low (7%)' },
    { value: 'M', label: 'Medium (15%)' },
    { value: 'Q', label: 'Quartile (25%)' },
    { value: 'H', label: 'High (30%)' },
];

const QrCodeOptions: React.FC<QrCodeOptionsProps> = ({ settings, onChange }) => {
    return (
        <div className="space-y-3 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/70">
            <div>
                <label htmlFor="qr-text" className="block text-xs font-semibold text-gray-600 mb-1">
                    Encoded Website, vCard or Link
                </label>
                <input
                    type="text"
                    id="qr-text"
                    value={settings.text}
                    onChange={(e) => onChange('text', e.target.value)}
                    placeholder="https://your-portfolio.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
            </div>
            
            <ColorPicker 
                label="QR Pattern Color"
                color={settings.color}
                onChange={(color) => onChange('color', color)}
            />

            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Error Correction Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-gray-200/70 rounded-xl">
                    {ERROR_CORRECTION_LEVELS.map(({ value, label }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => {
                                hapticEngine.triggerClick(200);
                                onChange('errorCorrectionLevel', value);
                            }}
                            className={`rounded-lg py-1 px-1.5 text-[11px] font-semibold transition-all ${
                                settings.errorCorrectionLevel === value
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QrCodeOptions;