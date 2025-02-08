'use client';

import { cn } from '@/utils/cn';
import { Manrope } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';

const manrope = Manrope({ subsets: ['latin'] });

const content = [
    {
        title: 'Personalized Teaching',
        description: 'Generates personalized content according to student needs',
        content: '🎯',
    },
    {
        title: 'Assessment',
        description:
            'Based on the student profile, assessments are done to measure progress and understanding',
        content: '📊',
    },
    {
        title: 'Quiz',
        description: "To check the student's level of grasping the knowledge presented",
        content: '🧠',
    },
    {
        title: 'Regional Language Support',
        description: 'The queries can be handled in multiple languages for better accessibility',
        content: '🌍',
    },
];

export default function WhyChooseUsPage() {
    const [activeCard, setActiveCard] = useState(0);
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        container: ref,
        offset: ['start start', 'end end'], // Changed from 'end start' to 'end end'
    });

    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const cardsBreakpoints = content.map((_, index) => {
            // Adjust the breakpoints to cover the full scroll range
            const adjustedIndex = index + 0.5; // Add offset to better capture the card
            return adjustedIndex / (cardLength + 1);
        });

        const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
            const distance = Math.abs(latest - breakpoint);
            if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                return index;
            }
            return acc;
        }, 0);
        
        // Ensure we don't go out of bounds
        const newActiveCard = Math.min(closestBreakpointIndex, cardLength - 1);
        setActiveCard(newActiveCard);
    });

    const backgroundColors = ['var(--slate-900)', 'var(--black)', 'var(--neutral-900)'];

    const linearGradients = [
        'linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))',
        'linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))',
        'linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))',
    ];

    const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    return (
        <div className={cn('min-h-screen bg-white pt-16 lg:pt-0', manrope.className)}>
            {/* Navigation Bar - Hidden on mobile */}
            <nav className="hidden lg:block bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <span className="text-2xl font-bold text-indigo-600">EduAI</span>
                        </div>
                        <div className="hidden sm:flex sm:space-x-8">
                            <a
                                href="/home"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium rounded-[3px]"
                            >
                                Home
                            </a>
                            <a
                                href="/demo"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium rounded-[3px]"
                            >
                                Try Demo
                            </a>
                            <a
                                href="/why-choose-us"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium rounded-[3px]"
                            >
                                Why Choose Us
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-[calc(100vh-4rem)] bg-white">
                <motion.div
                    animate={{ backgroundColor: 'white' }}
                    className="h-[calc(100vh-4rem)] overflow-y-auto flex flex-col lg:flex-row justify-center items-center lg:space-x-10 rounded-md p-4 lg:p-10"
                    ref={ref}
                >
                    <div className="div relative flex items-start px-4">
                        <div className="max-w-2xl">
                            {content.map((item, index) => (
                                <div key={item.title + index} className="my-24"> {/* Increased vertical margin */}
                                    <motion.h2
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                        className="text-2xl font-bold text-gray-900"
                                    >
                                        {item.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                        className="text-kg text-gray-700 max-w-sm mt-10"
                                    >
                                        {item.description}
                                    </motion.p>
                                </div>
                            ))}
                            <div className="h-[60vh]" /> {/* Increased bottom padding */}
                        </div>
                    </div>
                    <div className="hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden border border-gray-200">
                        <div className="flex items-center justify-center h-full text-8xl">
                            {content[activeCard].content}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
