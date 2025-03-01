import express from 'express';
import { login, signup } from '../Controllers/AuthController.js';
const authRouter =express.Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login)

export default authRouter;