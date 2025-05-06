"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; // Bearer <token>
    if (!token) {
        res.status(403).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET); // Replace with your secret key
        //@ts-ignore
        req.userId = decoded.id; //typescript does not allow adding properties to request object
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
