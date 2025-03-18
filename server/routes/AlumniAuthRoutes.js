import express from 'express';
import { SignUpAlumni, loginAlumni }  from '../controllers/AuthController.js';
const router = express.Router();

router.post('/signup', SignUpAlumni);
router.post('/login', loginAlumni);

export default router;
