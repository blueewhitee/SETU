import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        
        // Verify server is running before making the request
        try {
            // Test server connection
            await fetch('http://localhost:3001');
        } catch (error) {
            throw new Error('Backend server is not running. Please start the Express server on port 3001.');
        }

        const twilioResponse = await fetch('http://localhost:3001/query', {
            method: 'POST',
            body: formData,
        });

        if (!twilioResponse.ok) {
            const errorText = await twilioResponse.text();
            console.error('Backend API Error:', errorText);
            throw new Error(`Backend API Error: ${twilioResponse.status} ${errorText}`);
        }

        const data = await twilioResponse.json();
        return NextResponse.json({ success: true, response: data.response });
    } catch (error) {
        console.error('Full Error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to send message',
                details: error instanceof Error ? error.message : 'Unknown error',
                solution: 'Please ensure the Express server is running on port 3001'
            },
            { status: 500 }
        );
    }
} 
