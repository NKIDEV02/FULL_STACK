import { Router } from "express";
import { loginController, logoutController, refreshTokenController, registerController } from "../controllers/auth.controller";


const router = Router();


router.post('/register', registerController); // client POST register
router.post('/login', loginController); // client POST login
router.post('/refresh_token', refreshTokenController); // client POST refresh_token
router.post('/logout', logoutController); // client POST logout



export default router;
