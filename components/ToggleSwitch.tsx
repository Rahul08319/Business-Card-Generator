import React from 'react';
import { hapticEngine } from '../utils/haptics';

interface ToggleSwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange, description }) => {
    const id = `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className="flex items-center justify-between py-1">
            <div>
                <label htmlFor={id} className="text-xs font-semibold text-gray-700 block cursor-pointer">
                    {label}
                </label>
                {description && (
                    <p className="text-[11px] text-gray-400 mt-0.5">{description}</p>
                )}
            </div>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => {
                    hapticEngine.triggerClick(checked ? 160 : 240);
                    onChange(!checked);
                }}
                className={`${
                    checked ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
                <span
                    aria-hidden="true"
                    className={`${
                        checked ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out`}
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;
