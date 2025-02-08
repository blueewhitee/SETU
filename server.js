require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { HfInference } = require('@huggingface/inference');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { validateToken, sanitizeInput } = require('./securityUtils');
const SYSTEM_PROMPT = require('./systemPrompt');

const app = express();

// Security Middleware
app.use(helmet());
app.use(bodyParser.json({ limit: '1mb' }));

// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

// CORS Configuration
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true
}));

// Token Validation
const HF_TOKEN = process.env.HF_TOKEN;
if (!validateToken(HF_TOKEN)) {
    console.error('Invalid Hugging Face token configuration');
    process.exit(1);
}

const hfClient = new HfInference(HF_TOKEN);

// Enhanced Security Middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 