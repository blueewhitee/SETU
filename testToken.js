const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const hf = new HfInference(process.env.HF_TOKEN);

async function testToken() {
    try {
        const result = await hf.textGeneration({
            model: 'microsoft/Phi-3.5-mini-instruct',
            inputs: 'Hello, world!'
        });
        console.log('Token is valid:', result);
    } catch (error) {
        console.error('Token is invalid:', error);
    }
}

testToken(); 