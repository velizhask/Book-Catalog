import jwt from 'jsonwebtoken'  // We use JWT to verify the token

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization  // Get the Authorization header from the request

  // Check if the Authorization header is missing or doesn't start with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or invalid' })
  }

  // Extract the actual token by splitting after "Bearer "
  const token = authHeader.split(' ')[1]

  try {
    // Verify the token using our JWT secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Save the user info (from the token payload) into the request object
    req.user = decoded

    // Move to the next middleware or the route handler
    next()
  } catch (error) {
    // If the token is invalid or expired, block the request
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}

export default authMiddleware
