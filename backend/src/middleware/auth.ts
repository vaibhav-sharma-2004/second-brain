import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export function userAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies;

    const result = jwt.verify(token, process.env.JWT_SECRET!);

    if (!result) {
      res.status(401).json({
        success: false,
        message: "you are not authorized!",
      });
      return;
    }

    req.body.userId = (result as any).id;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
}