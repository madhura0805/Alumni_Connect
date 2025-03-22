import express from 'express';
import { SignUpStudent, loginStudent ,sendOTP} from '../controllers/AuthController.js';
const router = express.Router();

router.post('/signup', SignUpStudent);
router.post('/login', loginStudent);


export default router;

