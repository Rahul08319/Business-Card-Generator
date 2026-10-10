import React from 'react';
import { CARD_PRESETS } from '../constants';
import { CardPreset, TemplateId, StyleSettings } from '../types';
import { SparklesIcon, CheckIcon } from './icons';
import { hapticEngine } from '../utils/haptics';

interface PresetsGalleryProps {
    currentTemplate: TemplateId;
    currentStyle: StyleSettings;
    onApplyPreset: (preset: CardPreset) => void;
}

const PresetsGallery: React.FC<PresetsGalleryProps> = ({ 
    currentTemplate, 
    currentStyle, 
    onApplyPreset 
}) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Curated Apple Styles
                </span>
                <span className="text-[11px] text-blue-600 font-medium flex items-center space-x-1">
                    <SparklesIcon className="w-3.5 h-3.5" />
                    <span>Instant 1-Click Themes</span>
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CARD_PRESETS.map((preset) => {
                    const isActive = 
                        currentTemplate === preset.templateId &&
                        currentStyle.backgroundColor === preset.styles.backgroundColor;

                    return (
                        <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                                hapticEngine.triggerClick(240);
                                onApplyPreset(preset);
                            }}
                            className={`p-2.5 rounded-xl text-left border transition-all duration-200 relative group flex flex-col justify-between ${
                                isActive 
                                    ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-600' 
                                    : 'border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-sm'
                            }`}
                        >
                            <div className="flex items-center justify-between w-full mb-1.5">
                                <span className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {preset.name}
                                </span>
                                {isActive && (
                                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                        <CheckIcon className="w-2.5 h-2.5 text-white" />
                                    </span>
                                )}
                            </div>

                            {/* Color Swatch Preview */}
                            <div className="flex items-center space-x-1.5 mt-auto">
                                <div 
                                    className="w-4 h-4 rounded-full border border-black/10 shadow-inner" 
                                    style={{ backgroundColor: preset.styles.backgroundColor }} 
                                />
                                {preset.styles.useGradient && preset.styles.gradientColor && (
                                    <div 
                                        className="w-4 h-4 rounded-full border border-black/10 shadow-inner" 
                                        style={{ backgroundColor: preset.styles.gradientColor }} 
                                    />
                                )}
                                <div 
                                    className="w-4 h-4 rounded-full border border-black/10 shadow-inner" 
                                    style={{ backgroundColor: preset.styles.accentColor }} 
                                />
                                <span className="text-[10px] text-gray-400 capitalize ml-auto font-mono">
                                    {preset.styles.cardFinish || 'matte'}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PresetsGallery;
