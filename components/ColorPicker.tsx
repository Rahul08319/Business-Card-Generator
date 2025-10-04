
import React from 'react';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
    const inputId = `color-picker-${label.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
        <div>
            <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative flex items-center border border-gray-300 rounded-md p-1 pr-2 shadow-sm">
                 <div className="w-8 h-8 rounded" style={{ backgroundColor: color }}></div>
                 <input 
                    type="text" 
                    readOnly 
                    value={color.toUpperCase()} 
                    className="ml-2 w-full bg-transparent border-none focus:ring-0 text-sm font-mono"
                 />
                <input
                    type="color"
                    id={inputId}
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default ColorPicker;
