import express from 'express';
import { SignUpStudent, loginStudent } from '../controllers/AuthController.js';
const router = express.Router();

router.post('/signup', SignUpStudent);
router.post('/login', loginStudent);


export default router;

