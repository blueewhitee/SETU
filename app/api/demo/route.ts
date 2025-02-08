import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // Fetch random words from the API
        const response = await fetch('https://random-word-api.vercel.app/api?words=16');
        if (!response.ok) {
            throw new Error('Failed to fetch random words');
        }

        const words = await response.json();

        // Format the words into a chat-like response
        const chatResponse = `Here are some random words for you: ${words.join(', ')}. Use them creatively!`;

        return NextResponse.json({ success: true, response: chatResponse });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to generate response' },
            { status: 500 }
        );
    }
} 