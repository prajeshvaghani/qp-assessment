import express from "express";
import { createOrder } from "../controllers/orderController";
import { verifyToken } from "../middleware/index";

const router = express.Router();

router.post("/order", verifyToken, createOrder);

export default router;
