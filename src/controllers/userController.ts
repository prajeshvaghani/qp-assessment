import { Request, Response } from "express";
import { User } from "../models/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

function isValidEmail(email: string): boolean {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, userType } = req.body;

  // Hash password using bcrypt
  const saltRounds = 10; // Adjust saltRounds as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check for email uniqueness before creating user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create user with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    // Respond with success message
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found with this email" });
    }

    // Compare password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password invalid" });
    }

    // Generate JWT payload with user ID
    const payload = { userId: user.id };

    // Generate JWT token with secret key
    const secret = "YOUR_JWT_SECRET";
    const token = jwt.sign(payload, secret);

    // Respond with token
    res.json({
      message: "Login successfully",
      data: { token, ...user.dataValues },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing in" });
  }
};
