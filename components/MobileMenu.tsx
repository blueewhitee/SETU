'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="lg:hidden fixed top-0 w-full bg-white shadow-sm z-50">
            <div className="flex justify-between items-center p-4">
                <span className="text-2xl font-bold text-indigo-600">EduAI</span>
                <button
                    onClick={toggleMenu}
                    className="p-2 text-gray-700 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="bg-white px-4 pb-4">
                    <Link href="/home" className="block py-2 text-gray-700 hover:text-indigo-600">Home</Link>
                    <Link href="/demo" className="block py-2 text-gray-700 hover:text-indigo-600">Try Demo</Link>
                    <Link href="/why-choose-us" className="block py-2 text-gray-700 hover:text-indigo-600">Why Choose Us</Link>
                </div>
            )}
        </nav>
    );
} 