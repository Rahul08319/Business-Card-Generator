import React from 'react';
import { CardData } from '../types';
import { 
    UserIcon, 
    BriefcaseIcon, 
    BuildingIcon, 
    PhoneIcon, 
    MailIcon, 
    GlobeIcon, 
    LocationIcon, 
    UploadIcon, 
    TagIcon, 
    AtSignIcon,
    SparklesIcon
} from './icons';
import { hapticEngine } from '../utils/haptics';
import { getCurrentYear } from '../utils/yearManager';

interface CardFormProps {
    cardData: CardData;
    setCardData: React.Dispatch<React.SetStateAction<CardData>>;
    onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveLogo: () => void;
    logoPreview: string | null;
}

const InputField: React.FC<{
    id: keyof CardData;
    label: string;
    value: string;
    placeholder: string;
    icon: React.ReactNode;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, label, value, placeholder, icon, type = 'text', onChange }) => (
    <div>
        <label htmlFor={id} className="block text-xs font-semibold text-gray-600 mb-1">
            {label}
        </label>
        <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
        </div>
    </div>
);

const CardForm: React.FC<CardFormProps> = ({ 
    cardData, 
    setCardData, 
    onLogoChange,
    onRemoveLogo,
    logoPreview 
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    const handleAutoFillSample = () => {
        hapticEngine.triggerClick(200);
        const currentYear = getCurrentYear();
        setCardData({
            name: 'Alexander Wright',
            title: 'Lead Product Architect',
            company: 'Apple Design Labs',
            tagline: 'Simplicity is the ultimate sophistication.',
            phone: '+1 (408) 996-1010',
            email: 'a.wright@designlabs.io',
            website: 'www.designlabs.io',
            address: '1 Infinite Loop, Cupertino, CA',
            socialHandle: '@alexander_ux',
            issueYear: currentYear,
            validThruYear: currentYear + 3,
            logo: 'https://i.imgur.com/2Y40q3c.png',
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Personal & Business Info
                </span>
                <button
                    type="button"
                    onClick={handleAutoFillSample}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                >
                    <SparklesIcon className="w-3.5 h-3.5" />
                    <span>Load Cupertino Demo</span>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField 
                    id="name" 
                    label="Full Name" 
                    value={cardData.name} 
                    placeholder="e.g. Jane Doe" 
                    icon={<UserIcon />} 
                    onChange={handleChange} 
                />
                <InputField 
                    id="title" 
                    label="Job Title" 
                    value={cardData.title} 
                    placeholder="e.g. Senior Software Engineer" 
                    icon={<BriefcaseIcon />} 
                    onChange={handleChange} 
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField 
                    id="company" 
                    label="Company Name" 
                    value={cardData.company} 
                    placeholder="e.g. Tech Solutions Inc." 
                    icon={<BuildingIcon />} 
                    onChange={handleChange} 
                />
                <InputField 
                    id="tagline" 
                    label="Tagline / Motto" 
                    value={cardData.tagline || ''} 
                    placeholder="e.g. Think Different" 
                    icon={<TagIcon />} 
                    onChange={handleChange} 
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField 
                    id="phone" 
                    label="Phone" 
                    value={cardData.phone} 
                    placeholder="e.g. +1 (555) 123-4567" 
                    icon={<PhoneIcon />} 
                    onChange={handleChange} 
                />
                <InputField 
                    id="email" 
                    label="Email" 
                    value={cardData.email} 
                    placeholder="e.g. jane.doe@example.com" 
                    icon={<MailIcon />} 
                    onChange={handleChange} 
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField 
                    id="website" 
                    label="Website" 
                    value={cardData.website} 
                    placeholder="e.g. www.example.com" 
                    icon={<GlobeIcon />} 
                    onChange={handleChange} 
                />
                <InputField 
                    id="socialHandle" 
                    label="Social / GitHub Handle" 
                    value={cardData.socialHandle || ''} 
                    placeholder="e.g. @janedoe" 
                    icon={<AtSignIcon />} 
                    onChange={handleChange} 
                />
            </div>

            <InputField 
                id="address" 
                label="Physical Address" 
                value={cardData.address} 
                placeholder="e.g. 123 Innovation Drive, Tech City" 
                icon={<LocationIcon />} 
                onChange={handleChange} 
            />

            {/* Logo Upload Section */}
            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Company Logo / Icon</label>
                <div className="flex items-center space-x-3">
                    <label className="flex-1 flex items-center justify-center px-4 py-2 bg-white text-gray-700 rounded-xl border border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all duration-200 group">
                        <UploadIcon />
                        <span className="ml-2 text-xs font-medium text-gray-600 group-hover:text-blue-600">
                            Upload PNG / SVG
                        </span>
                        <input type="file" id="logo" className="hidden" accept="image/*" onChange={onLogoChange} />
                    </label>

                    {(logoPreview || cardData.logo) && (
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-lg border bg-gray-50 flex items-center justify-center p-1 overflow-hidden">
                                <img src={logoPreview || cardData.logo} alt="Thumb" className="max-h-full max-w-full object-contain" />
                            </div>
                            <button
                                type="button"
                                onClick={onRemoveLogo}
                                className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-md hover:bg-red-50"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardForm;
