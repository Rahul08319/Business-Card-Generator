import React from 'react';
import { TypographyIcon } from './icons';
import { FONTS } from '../constants';
import { hapticEngine } from '../utils/haptics';

interface FontSelectorProps {
    selectedFont: string;
    onFontChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ selectedFont, onFontChange }) => {
    return (
        <div>
            <label htmlFor="font-selector" className="block text-xs font-semibold text-gray-600 mb-1">
                Typography & Font Family
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <TypographyIcon />
                </div>
                <select
                    id="font-selector"
                    value={selectedFont}
                    onChange={(e) => {
                        hapticEngine.triggerClick(200);
                        onFontChange(e.target.value);
                    }}
                    className="w-full pl-9 pr-8 py-2 bg-gray-50/70 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    style={{ fontFamily: selectedFont }}
                >
                    {FONTS.map(font => (
                        <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>
                            {font.name}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default FontSelector;