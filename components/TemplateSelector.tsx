
import React from 'react';
import { TemplateId } from '../types';
import { TEMPLATES } from '../constants';

interface TemplateSelectorProps {
    activeTemplate: TemplateId;
    onSelectTemplate: (templateId: TemplateId) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ activeTemplate, onSelectTemplate }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {TEMPLATES.map(template => (
                <div 
                    key={template.id}
                    onClick={() => onSelectTemplate(template.id)}
                    className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${activeTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 hover:border-blue-400'}`}
                >
                    <img src={template.thumbnail} alt={template.name} className="w-full h-auto object-cover" />
                    <p className="text-center text-sm font-medium p-1 bg-gray-50">{template.name}</p>
                </div>
            ))}
        </div>
    );
};

export default TemplateSelector;
