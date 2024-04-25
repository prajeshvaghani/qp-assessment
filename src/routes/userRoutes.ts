import express from "express";
import { createUser, userLogin } from "../controllers/userController";

const router = express.Router();

router.post("/sign-up", createUser);
router.post("/sign-in", userLogin);

export default router;
