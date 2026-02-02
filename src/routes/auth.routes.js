import express from "express";
import { loginOwner } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginOwner);

export default router;
