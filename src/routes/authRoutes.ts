import express from "express";
import { login, register } from "../controllers/authController";
import apiBaseUrl from "../config/apiBaseUrl";

const router = express.Router();

router.post(`${apiBaseUrl}/register`, register);

router.post(`${apiBaseUrl}/login`, login);

export default router;
