'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export default function DemoPage() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'ai', text: 'Hi! What topic would you like to learn about today?' },
    ]);
    const [isZoomed, setIsZoomed] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = useCallback(async () => {
        if (!message.trim()) return;

        setIsLoading(true);
        setChatHistory(prev => [...prev, { sender: 'user', text: message }]);

        try {
            const response = await fetch('/api/demo', {
                method: 'POST',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            const data = await response.json();

            // Add a placeholder for the AI's response
            setChatHistory(prev => [...prev, { sender: 'ai', text: '' }]);

            // Simulate typing effect
            let typedResponse = '';
            for (const char of data.response) {
                typedResponse += char;
                setChatHistory(prev => [
                    ...prev.slice(0, -1), // Keep all messages except the last one
                    { sender: 'ai', text: typedResponse } // Update the last message
                ]);
                await new Promise(resolve => setTimeout(resolve, 50)); // Adjust typing speed
            }
        } catch (error) {
            console.error('Full Error:', error);
            setChatHistory(prev => [
                ...prev,
                {
                    sender: 'ai',
                    text: `Error: ${error instanceof Error ? error.message : 'Failed to send message'}`
                }
            ]);
        } finally {
            setIsLoading(false);
            setMessage('');
        }
    }, [message]);

    const handleAttachmentClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-white pt-16 lg:pt-0">
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

            {/* Demo Section */}
            <section className="px-4 sm:px-6 py-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Feature Description - Visible on mobile */}
                    <div className="lg:w-1/3">
                        <h2 className="text-3xl font-bold text-indigo-800 mb-6">
                            Experience Learning via SMS
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-indigo-600">1</span>
                                </div>
                                <p className="text-gray-700">
                                    Works on any basic phone with SMS capability
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-indigo-600">2</span>
                                </div>
                                <p className="text-gray-700">
                                    Adaptive learning that understands your pace
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-indigo-600">3</span>
                                </div>
                                <p className="text-gray-700">
                                    24/7 availability for learning anytime
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Phone Demo */}
                    <div className={cn(
                        "w-full mx-auto",
                        isZoomed ? "fixed inset-0 z-40 bg-white p-4" : "lg:w-2/3"
                    )}>
                        <div className={cn(
                            "bg-black rounded-[3rem] p-4 shadow-xl relative",
                            isZoomed ? "h-full w-full" : "max-w-sm mx-auto"
                        )}>
                            {/* Zoom Button */}
                            <button
                                onClick={() => setIsZoomed(!isZoomed)}
                                className="absolute -top-4 -right-4 z-50 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
                                aria-label={isZoomed ? "Minimize" : "Maximize"}
                            >
                                {isZoomed ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" />
                                    </svg>
                                )}
                            </button>

                            {/* Dynamic Island */}
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black rounded-full flex items-center justify-center space-x-1">
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                            </div>

                            {/* Speaker */}
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full"></div>

                            {/* Screen Content */}
                            <div className="bg-white rounded-[2.5rem] p-4 pt-10 h-full">
                                {/* Chat Interface */}
                                <div className={cn(
                                    "flex flex-col justify-end space-y-2 overflow-y-auto",
                                    isZoomed ? "h-[calc(100vh-10rem)]" : "h-[500px]"
                                )}>
                                    <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
                                        {chatHistory.map((msg, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    "p-3 rounded-lg max-w-[80%] text-sm",
                                                    msg.sender === 'ai' 
                                                        ? 'bg-indigo-100 text-gray-700' 
                                                        : 'bg-gray-100 text-gray-700 ml-auto'
                                                )}
                                            >
                                                <p>{msg.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="mt-4 flex flex-col gap-2 p-2">
                                    <div className="flex justify-start">
                                        <button
                                            onClick={handleAttachmentClick}
                                            className="p-2 text-indigo-600 hover:text-indigo-700"
                                            aria-label="Attach file"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </button>
                                    </div>
                                    <div className="flex gap-2 w-full">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Type your message..."
                                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Sending...' : 'Send'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Side Button */}
                            <div className="absolute right-0 top-24 h-20 w-1 bg-gray-800 rounded-l-full"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
