import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/error";

export interface AuthRequest extends Request {
  user?: { id: string };
}

interface TokenPayload extends JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) throw new AppError("Unauthorized", 401);

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (typeof decoded !== "object" || !("id" in decoded)) {
      throw new AppError("Invalid Token", 401);
    }

    const payload = decoded as TokenPayload;

    req.user = { id: payload.id };
    next();
  } catch {
    throw new AppError("Invalid Token", 401);
  }
};


