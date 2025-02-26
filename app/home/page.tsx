'use client';

import { Manrope } from 'next/font/google';
import { WavyBackground } from '@/components/ui/wavy-background';

const manrope = Manrope({ subsets: ['latin'] });

export default function HomePage() {
    return (
        <WavyBackground>
            <div className="min-h-screen pt-16 lg:pt-0 bg-transparent flex flex-col">
                {/* Navigation Bar - Fixed at the top */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent shadow-sm">
                    <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-blue-900">SETU</span>
                        </div>
                        <div className="hidden sm:flex sm:space-x-8">
                            <a href="/home" className="text-blue-900 hover:text-blue-700">
                                Home
                            </a>
                            <a href="/demo" className="text-blue-900 hover:text-blue-700">
                                Try Demo
                            </a>
                            <a
                                href="/why-choose-us"
                                className="text-blue-900 hover:text-blue-700"
                            >
                                Why Choose Us
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Centered Hero Content */}
                <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="text-center px-4 bg-transparent">
                        <h1 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-6">
                            Education Without Boundaries
                        </h1>
                        <p className="text-lg lg:text-xl text-blue-800 mb-8 max-w-2xl mx-auto">
                            Bringing AI-powered education to every device, no matter how basic.
                            Because everyone deserves access to quality education.
                        </p>
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 justify-center">
                            <a
                                href="/demo"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Try Demo
                            </a>
                            <a
                                href="/home"
                                className="bg-white text-blue-900 px-6 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </WavyBackground>
    );
}
