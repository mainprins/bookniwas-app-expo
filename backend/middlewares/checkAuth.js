import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No Token Provided." });
    }
    
   const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized:No Token Provided." })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });

    }
}

