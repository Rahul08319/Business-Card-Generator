
import React from 'react';
import { GradientDirection } from '../types';

interface GradientDirectionSelectorProps {
    selectedDirection: GradientDirection;
    onDirectionChange: (direction: GradientDirection) => void;
}

const DIRECTIONS: { id: GradientDirection, rotation: string }[] = [
    { id: 'to-tl', rotation: '-rotate-135' },
    { id: 'to-t', rotation: '-rotate-90' },
    { id: 'to-tr', rotation: '-rotate-45' },
    { id: 'to-l', rotation: 'rotate-180' },
    { id: 'to-r', rotation: 'rotate-0' },
    { id: 'to-bl', rotation: 'rotate-135' },
    { id: 'to-b', rotation: 'rotate-90' },
    { id: 'to-br', rotation: 'rotate-45' },
];

const GradientDirectionSelector: React.FC<GradientDirectionSelectorProps> = ({ selectedDirection, onDirectionChange }) => {
    return (
        <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Gradient Direction</p>
            <div className="grid grid-cols-8 gap-1">
                {DIRECTIONS.map(({ id, rotation }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => onDirectionChange(id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            selectedDirection === id 
                                ? 'bg-blue-500 text-white ring-2 ring-offset-2 ring-blue-500' 
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                        aria-label={`Gradient to ${id.replace('to-', '')}`}
                    >
                        <svg className={`w-5 h-5 ${rotation}`} viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GradientDirectionSelector;
