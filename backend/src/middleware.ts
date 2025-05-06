import { NextFunction,Request,Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']; // Bearer <token>
    if (!token) {
         res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token as string, JWT_SECRET); // Replace with your secret key

        //@ts-ignore
        req.userId = decoded.id; //typescript does not allow adding properties to request object
         next();
        
    } catch (error) {
         res.status(403).json({ message: 'Invalid token' });
    }
};
