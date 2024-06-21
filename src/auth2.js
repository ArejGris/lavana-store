const jwt = require('jsonwebtoken');

// Function to generate an access token
 function generateAccessToken(userId, expiresIn = '30d') {
  return jwt.sign({ userId },"secretkeyone", { expiresIn });
}

// Function to generate a refresh token
function generateRefreshToken(userId, expiresIn = '90d') {
  return jwt.sign({ userId }, "secretkeytwo", { expiresIn });
}
function generateAdminToken(userId, expiresIn = '90d') {
  return jwt.sign({ userId }, "secretkeyadmin", { expiresIn });
}
module.exports={generateAccessToken,generateRefreshToken,generateAdminToken}
