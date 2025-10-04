
import React from 'react';
import { CardData } from '../types';
import { UserIcon, BriefcaseIcon, BuildingIcon, PhoneIcon, MailIcon, GlobeIcon, LocationIcon, UploadIcon } from './icons';

interface CardFormProps {
    cardData: CardData;
    setCardData: React.Dispatch<React.SetStateAction<CardData>>;
    onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<{
    id: keyof CardData;
    label: string;
    value: string;
    placeholder: string;
    icon: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, label, value, placeholder, icon, onChange }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type="text"
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
        </div>
    </div>
);

const CardForm: React.FC<CardFormProps> = ({ cardData, setCardData, onLogoChange }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form>
            <InputField id="name" label="Full Name" value={cardData.name} placeholder="e.g. Jane Doe" icon={<UserIcon />} onChange={handleChange} />
            <InputField id="title" label="Job Title" value={cardData.title} placeholder="e.g. Senior Software Engineer" icon={<BriefcaseIcon />} onChange={handleChange} />
            <InputField id="company" label="Company" value={cardData.company} placeholder="e.g. Tech Solutions Inc." icon={<BuildingIcon />} onChange={handleChange} />
            <InputField id="phone" label="Phone" value={cardData.phone} placeholder="e.g. +1 (555) 123-4567" icon={<PhoneIcon />} onChange={handleChange} />
            <InputField id="email" label="Email" value={cardData.email} placeholder="e.g. jane.doe@example.com" icon={<MailIcon />} onChange={handleChange} />
            <InputField id="website" label="Website" value={cardData.website} placeholder="e.g. www.example.com" icon={<GlobeIcon />} onChange={handleChange} />
            <InputField id="address" label="Address" value={cardData.address} placeholder="e.g. 123 Innovation Drive, Tech City" icon={<LocationIcon />} onChange={handleChange} />
            
            <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                 <label className="w-full flex items-center px-4 py-2 bg-white text-blue-500 rounded-lg shadow-sm tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200">
                    <UploadIcon />
                    <span className="ml-2 text-base leading-normal">Select a file</span>
                    <input type='file' id="logo" className="hidden" accept="image/*" onChange={onLogoChange} />
                </label>
            </div>
        </form>
    );
};

export default CardForm;
