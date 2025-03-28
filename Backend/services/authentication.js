const JWT = require('jsonwebtoken');

const secret = 'QloudDevelopmentSecretKeyMartinMarvan'

function createTokenUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    const token = JWT.sign(payload, secret, { expiresIn: '59m' });
    return token;
}

function validateToken(token){
    // Verify the token
    try {
        const payload = JWT.verify(token, secret);
        //console.log("Payload", payload);
        return payload
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new Error("Token expired. Please log in again.");
        }
        throw new Error("Invalid token.");
    }
}

module.exports = { createTokenUser, validateToken }
