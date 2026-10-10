import React from 'react';
import { hapticEngine } from '../utils/haptics';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
    const inputId = `color-picker-${label.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
        <div>
            <label htmlFor={inputId} className="block text-xs font-semibold text-gray-600 mb-1">
                {label}
            </label>
            <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1.5 shadow-sm hover:border-gray-300 transition-all">
                <div 
                    className="w-7 h-7 rounded-lg border border-black/10 shadow-sm flex-shrink-0 cursor-pointer" 
                    style={{ backgroundColor: color }} 
                />
                <input 
                    type="text" 
                    readOnly 
                    value={color.toUpperCase()} 
                    className="ml-2 w-full bg-transparent border-none focus:ring-0 text-xs font-mono font-medium text-gray-700"
                />
                <input
                    type="color"
                    id={inputId}
                    value={color}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    onBlur={() => hapticEngine.triggerClick(180)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default ColorPicker;
