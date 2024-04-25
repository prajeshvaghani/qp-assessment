import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import { User } from "../models/user";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

interface DecodedToken extends JwtPayload {
  userId: number;
}

// Middleware to verify JWT token and extract user ID
export const verifyToken: MiddlewareFunction = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized: Missing token" });
    return;
  }

  const secret = "YOUR_JWT_SECRET";

  jwt.verify(token, secret, (err: VerifyErrors | null, decoded: any) => {
    if (err || !token) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    const { userId } = decoded;

    if (!userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: Missing userId in token" });
    }
    next();
  });
};

export const isAdmin: MiddlewareFunction = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized: Missing token" });
      return;
    }

    const secret = "YOUR_JWT_SECRET";

    jwt.verify(
      token,
      secret,
      async (err: VerifyErrors | null, decoded: any) => {
        const { userId } = decoded;
        const user = await User.findByPk(userId);
        if (user && user.userType === "admin") {
          next();
        } else {
          res.status(403).json({ error: "Unauthorized: User is not an admin" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
