import { Request, Response } from "express";
import { Product } from "../models/product";
import { User } from "../models/user";
import { Order } from "../models/order";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    }

    const order = await Order.create({
      userId: userId,
      productId: productId,
    });

    res.json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create order" });
  }
};
