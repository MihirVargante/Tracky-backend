const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    console.log("here is your token---->",token)
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, 'kljclsadflkdsjfklsdjfklsdjf'); // Use the same secret key you used to sign the token
        req.user = decoded; // Attach the decoded user info to the request object
        console.log("here is your user---->",req.user._id)
        next(); // Pass control to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
