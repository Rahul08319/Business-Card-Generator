import React from 'react';
import { AppleLogoIcon, ExternalLinkIcon } from './icons';
import { getCopyrightNotice, getCurrentYear, getNextAutoUpdateDate } from '../utils/yearManager';

const Footer: React.FC = () => {
    const currentYear = getCurrentYear();
    const nextUpdate = getNextAutoUpdateDate();

    return (
        <footer className="mt-16 border-t border-black/[0.06] dark:border-white/[0.08] bg-white/50 dark:bg-[#161617]/50 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 text-xs text-gray-500 transition-colors">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Col 1: About */}
                    <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center space-x-2 text-gray-900 dark:text-white font-semibold">
                            <AppleLogoIcon className="w-4 h-4 fill-current" />
                            <span>Business Card Studio • Apple Pro Edition</span>
                        </div>
                        <p className="text-gray-500 max-w-md leading-relaxed text-xs">
                            Engineered with Human Interface Guidelines (HIG), 2025 Liquid Glass materials, real-time 3D spring dynamics, front/back physical card simulation, and automatic perpetual calendar synchronization.
                        </p>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Auto-Updated for {currentYear} • Next Cycle: {nextUpdate}</span>
                        </div>
                    </div>

                    {/* Col 2: Specifications */}
                    <div className="space-y-2">
                        <span className="font-semibold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                            Print & Digital Specs
                        </span>
                        <ul className="space-y-1.5 text-gray-500">
                            <li>• Standard 3.5" × 2" Form Factor</li>
                            <li>• 300 DPI Ultra-High Resolution PNG</li>
                            <li>• Two-Sided Print-Ready Vector PDF</li>
                            <li>• High-Precision Scalable SVG</li>
                            <li>• Zero-Latency Web Audio Haptics</li>
                        </ul>
                    </div>

                    {/* Col 3: Links */}
                    <div className="space-y-2">
                        <span className="font-semibold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                            Repository & Author
                        </span>
                        <ul className="space-y-1.5">
                            <li>
                                <a 
                                    href="https://github.com/Rahul08319/Business-Card-Generator"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-blue-600 flex items-center space-x-1 text-gray-500 transition-colors"
                                >
                                    <span>GitHub Repository</span>
                                    <ExternalLinkIcon className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://github.com/Rahul08319"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-blue-600 flex items-center space-x-1 text-gray-500 transition-colors"
                                >
                                    <span>Created by Rahul08319</span>
                                    <ExternalLinkIcon className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <span className="text-gray-400">Open Source MIT License</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="pt-6 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400">
                    <p>{getCopyrightNotice(2024)}. All rights reserved.</p>
                    <p className="mt-2 sm:mt-0 font-mono">
                        Build {currentYear}.4 • Continuous Auto-Update Enabled
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
