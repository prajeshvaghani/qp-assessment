import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { isAdmin, verifyToken } from "../middleware/index";

const router = express.Router();

router.post("/products", verifyToken, isAdmin, createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", verifyToken, isAdmin, updateProduct);
router.delete("/products/:id", verifyToken, isAdmin, deleteProduct);

export default router;
