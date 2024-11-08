import express from 'express'
import { signup,verifyEmail } from '../controller/authController.js';

const router= express.Router();

router.post('/signup',signup);
router.post('/verify',verifyEmail);
// router.post('/login',login);

// router.post('/logout',logout);


export default router;



