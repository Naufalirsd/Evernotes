import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Token verification error:", error);
        return null;
    }
};
