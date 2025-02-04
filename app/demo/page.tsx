'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from "@/utils/cn";

export default function DemoPage() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'ai', text: 'Hi! What topic would you like to learn about today?' }
    ]);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        
        // Add user message to chat
        setChatHistory(prev => [...prev, { sender: 'user', text: message }]);
        
        // Simulate AI response
        setTimeout(() => {
            setChatHistory(prev => [...prev, { sender: 'ai', text: `Great! Let's talk about ${message}. Here's some information...` }]);
        }, 1000);

        // Clear input
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <span className="text-2xl font-bold text-indigo-600">EduAI</span>
                        </div>
                        <div className="hidden sm:flex sm:space-x-8">
                            <a href="/home" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium rounded-[3px]">
                                Home
                            </a>
                            <a href="/demo" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium rounded-[3px]">
                                Try Demo
                            </a>
                            <a href="/why-choose-us" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium rounded-[3px]">
                                Why Choose Us
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Demo Section */}
            <section className="px-6 py-16">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                    {/* Feature Description */}
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
                    <div className="lg:w-2/3">
                        <div className="max-w-sm mx-auto bg-black rounded-[3rem] p-4 shadow-xl relative">
                            {/* Dynamic Island */}
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black rounded-full flex items-center justify-center space-x-1">
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                            </div>
                            
                            {/* Speaker */}
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full"></div>
                            
                            {/* Screen Content */}
                            <div className="bg-white rounded-[2.5rem] p-6 pt-10">
                                {/* Chat Interface */}
                                <div className="h-[500px] flex flex-col justify-end space-y-2 overflow-y-auto">
                                    {chatHistory.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`
                                                p-3 rounded-lg max-w-[80%] text-sm
                                                ${msg.sender === 'ai' 
                                                    ? 'bg-indigo-100 text-gray-700' 
                                                    : 'bg-gray-100 text-gray-700 ml-auto'
                                                }
                                            `}
                                        >
                                            <p>{msg.text}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Input Area */}
                                <div className="mt-4 flex gap-2">
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
                                    >
                                        Send
                                    </button>
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