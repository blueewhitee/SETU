const crypto = require('crypto');

// Validate Hugging Face Token
exports.validateToken = (token) => {
    if (!token || typeof token !== 'string') return false;
    return token.length === 32 && /^[a-zA-Z0-9_\-]+$/.test(token);
};

// Sanitize User Input
exports.sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#96;')
        .replace(/\$/g, '&#36;')
        .substring(0, 1000);
};

// Generate Secure Token
exports.generateSecureToken = () => {
    return crypto.randomBytes(32).toString('hex');
}; 