import React from 'react';
import { TypographyIcon } from './icons';

const FONTS = [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Times New Roman', value: "'Times New Roman', serif" },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Courier New', value: "'Courier New', monospace" },
    { name: 'Trebuchet MS', value: "'Trebuchet MS', sans-serif" },
    { name: 'Lucida Sans', value: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" },
];

interface FontSelectorProps {
    selectedFont: string;
    onFontChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ selectedFont, onFontChange }) => {
    return (
        <div>
            <label htmlFor="font-selector" className="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TypographyIcon />
                </div>
                <select
                    id="font-selector"
                    value={selectedFont}
                    onChange={(e) => onFontChange(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none bg-white"
                    style={{ fontFamily: selectedFont }}
                >
                    {FONTS.map(font => (
                        <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>
                            {font.name}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default FontSelector;