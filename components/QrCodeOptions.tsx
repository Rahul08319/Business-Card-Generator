import React from 'react';
import { QrCodeSettings, QrCodeErrorCorrectionLevel } from '../types';
import ColorPicker from './ColorPicker';

interface QrCodeOptionsProps {
    settings: QrCodeSettings;
    onChange: <K extends keyof QrCodeSettings>(key: K, value: QrCodeSettings[K]) => void;
}

const ERROR_CORRECTION_LEVELS: { value: QrCodeErrorCorrectionLevel, label: string }[] = [
    { value: 'L', label: 'Low' },
    { value: 'M', label: 'Medium' },
    { value: 'Q', label: 'Quartile' },
    { value: 'H', label: 'High' },
];

const QrCodeOptions: React.FC<QrCodeOptionsProps> = ({ settings, onChange }) => {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="qr-text" className="block text-sm font-medium text-gray-700 mb-1">URL or Text</label>
                <input
                    type="text"
                    id="qr-text"
                    value={settings.text}
                    onChange={(e) => onChange('text', e.target.value)}
                    placeholder="https://your-website.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
            </div>
            
            <ColorPicker 
                label="QR Code Color"
                color={settings.color}
                onChange={(color) => onChange('color', color)}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Error Correction</label>
                <div className="flex space-x-1 rounded-lg bg-gray-200 p-1">
                    {ERROR_CORRECTION_LEVELS.map(({ value, label }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => onChange('errorCorrectionLevel', value)}
                            className={`w-full rounded-md py-1 px-2 text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                settings.errorCorrectionLevel === value
                                    ? 'bg-white text-blue-600 shadow'
                                    : 'bg-transparent text-gray-600 hover:bg-white/60'
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