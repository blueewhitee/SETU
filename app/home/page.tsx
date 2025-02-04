'use client';

import { Manrope } from 'next/font/google';
import { WavyBackground } from "@/components/ui/wavy-background";

const manrope = Manrope({ subsets: ['latin'] });

export default function HomePage() {
  return (
    <div className={`relative w-full h-screen ${manrope.className}`}>
      {/* Wavy Background */}
      <WavyBackground className="absolute inset-0 z-0">
        <div className="relative z-20">
          {/* Navigation */}
          <nav className="p-4 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-900">EduAI</span>
              </div>
              <div className="hidden sm:flex sm:space-x-8">
                <a href="/home" className="text-blue-900 hover:text-blue-700">Home</a>
                <a href="/demo" className="text-blue-900 hover:text-blue-700">Try Demo</a>
                <a href="/why-choose-us" className="text-blue-900 hover:text-blue-700">Why Choose Us</a>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="pt-20 pb-8 text-center">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">
              Education Without Boundaries
            </h1>
            <p className="text-xl text-blue-800 mb-8 max-w-2xl mx-auto">
              Bringing AI-powered education to every device, no matter how basic. Because everyone deserves access to quality education.
            </p>
            <div className="space-x-4">
              <a 
                href="/demo" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Demo
              </a>
              <a 
                href="/home" 
                className="bg-white text-blue-900 px-8 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </WavyBackground>
    </div>
  );
}
