
import React from 'react';

const DPI_OPTIONS = [
    { value: 96, label: 'Standard', description: 'For Web' },
    { value: 150, label: 'Medium', description: 'Good Quality' },
    { value: 300, label: 'High', description: 'For Print' },
];

interface DpiSelectorProps {
    selectedDpi: number;
    onDpiChange: (dpi: number) => void;
}

const DpiSelector: React.FC<DpiSelectorProps> = ({ selectedDpi, onDpiChange }) => {
    return (
        <div className="mt-4">
             <p className="block text-sm font-medium text-gray-700 mb-2">PNG Resolution (DPI)</p>
             <div className="flex space-x-2 rounded-lg bg-gray-200 p-1">
                {DPI_OPTIONS.map(({ value, label, description }) => (
                    <button
                        key={value}
                        onClick={() => onDpiChange(value)}
                        className={`w-full rounded-md py-1.5 px-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            selectedDpi === value
                                ? 'bg-white text-blue-600 shadow'
                                : 'bg-transparent text-gray-600 hover:bg-white/60'
                        }`}
                        aria-pressed={selectedDpi === value}
                    >
                        <span className="block">{label}</span>
                         <span className="block text-xs font-normal text-gray-500">{description}</span>
                    </button>
                ))}
             </div>
        </div>
    );
};

export default DpiSelector;
