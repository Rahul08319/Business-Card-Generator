import React from 'react';
import { TemplateId } from '../types';
import { TEMPLATES } from '../constants';
import { CheckIcon } from './icons';
import { hapticEngine } from '../utils/haptics';

interface TemplateSelectorProps {
    activeTemplate: TemplateId;
    onSelectTemplate: (templateId: TemplateId) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ activeTemplate, onSelectTemplate }) => {
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TEMPLATES.map(template => {
                    const isSelected = activeTemplate === template.id;

                    return (
                        <div 
                            key={template.id}
                            onClick={() => {
                                hapticEngine.triggerClick(210);
                                onSelectTemplate(template.id);
                            }}
                            className={`cursor-pointer group rounded-xl p-2 border transition-all duration-200 relative bg-white flex flex-col justify-between ${
                                isSelected 
                                    ? 'border-blue-600 shadow-sm ring-1 ring-blue-600 bg-blue-50/20' 
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                            }`}
                        >
                            {/* SVG Vector Thumbnail */}
                            <div 
                                className="w-full h-14 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 mb-2 border border-black/[0.04]"
                                dangerouslySetInnerHTML={{ __html: template.thumbnailSvg }}
                            />

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {template.name}
                                </span>
                                {isSelected && (
                                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                        <CheckIcon className="w-2.5 h-2.5 text-white" />
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                                {template.category}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TemplateSelector;
