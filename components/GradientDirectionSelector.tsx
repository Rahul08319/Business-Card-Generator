import React from 'react';
import { GradientDirection } from '../types';
import { hapticEngine } from '../utils/haptics';

interface GradientDirectionSelectorProps {
    selectedDirection: GradientDirection;
    onDirectionChange: (direction: GradientDirection) => void;
}

const DIRECTIONS: { id: GradientDirection, rotation: string, label: string }[] = [
    { id: 'to-tl', rotation: '-rotate-135', label: 'Top Left' },
    { id: 'to-t', rotation: '-rotate-90', label: 'Top' },
    { id: 'to-tr', rotation: '-rotate-45', label: 'Top Right' },
    { id: 'to-l', rotation: 'rotate-180', label: 'Left' },
    { id: 'to-r', rotation: 'rotate-0', label: 'Right' },
    { id: 'to-bl', rotation: 'rotate-135', label: 'Bottom Left' },
    { id: 'to-b', rotation: 'rotate-90', label: 'Bottom' },
    { id: 'to-br', rotation: 'rotate-45', label: 'Bottom Right' },
];

const GradientDirectionSelector: React.FC<GradientDirectionSelectorProps> = ({ selectedDirection, onDirectionChange }) => {
    return (
        <div>
            <p className="block text-xs font-semibold text-gray-600 mb-2">Gradient Angle</p>
            <div className="grid grid-cols-8 gap-1.5 p-1 bg-gray-100 rounded-xl">
                {DIRECTIONS.map(({ id, rotation, label }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => {
                            hapticEngine.triggerClick(200);
                            onDirectionChange(id);
                        }}
                        className={`h-7 rounded-lg flex items-center justify-center transition-all ${
                            selectedDirection === id 
                                ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                        }`}
                        title={label}
                        aria-label={`Gradient to ${id.replace('to-', '')}`}
                    >
                        <svg className={`w-3.5 h-3.5 ${rotation}`} viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GradientDirectionSelector;
