import { Router } from "express";
import { confirmEmailController, forgotPasswordController, loginController, logoutController, refreshTokenController, registerController, resetPasswordController } from "../controllers/auth.controller";


const router = Router();


router.post('/register', registerController); // client POST register
router.post('/login', loginController); // client POST login
router.post('/refresh_token', refreshTokenController); // client POST refresh_token
router.post('/logout', logoutController); // client POST logout

router.get('/confirm-email/:token', confirmEmailController); // client GET email
router.post('/forgot-password', forgotPasswordController); // client POST forgot password 
router.post('/reset-password', resetPasswordController); // client POST reset password 






export default router;
