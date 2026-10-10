import React from 'react';
import { hapticEngine } from '../utils/haptics';

const DPI_OPTIONS = [
    { value: 96, label: '96 DPI', description: 'Web' },
    { value: 150, label: '150 DPI', description: 'HD' },
    { value: 300, label: '300 DPI', description: 'Print' },
];

interface DpiSelectorProps {
    selectedDpi: number;
    onDpiChange: (dpi: number) => void;
}

const DpiSelector: React.FC<DpiSelectorProps> = ({ selectedDpi, onDpiChange }) => {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Export Resolution</label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100/90 rounded-xl">
                {DPI_OPTIONS.map(({ value, label, description }) => {
                    const isSelected = selectedDpi === value;
                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => {
                                hapticEngine.triggerClick(220);
                                onDpiChange(value);
                            }}
                            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                isSelected
                                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                            }`}
                        >
                            <span>{label}</span>
                            <span className="block text-[10px] font-normal opacity-60">{description}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DpiSelector;
