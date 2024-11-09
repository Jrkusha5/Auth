import express from 'express'
import { signup,verifyEmail ,logout,login, forgotPassword,resetPassword,checkAuth} from '../controller/authController.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router= express.Router();

router.get('/check-auth', verifyToken,checkAuth);
router.post('/signup',signup);
router.post('/verify',verifyEmail);
 router.post('/login',login);
 router.post('/forgotpassword',forgotPassword);
 router.post('/reset-password/:token',resetPassword);
 router.post('/logout',logout);


export default router;



