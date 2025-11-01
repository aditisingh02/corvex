const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified
    }
  });
};

// Generate random token
const generateRandomToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Hash token
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

module.exports = {
  generateToken,
  sendTokenResponse,
  generateRandomToken,
  hashToken
};