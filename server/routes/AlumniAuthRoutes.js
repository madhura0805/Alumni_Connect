import express from 'express';
import { SignUpAlumni, loginAlumni } from '../controllers/AuthController.js';
import upload from "../middlewares/uploadMiddleware.js"
const router = express.Router();

router.post("/signup", upload.single("profileImage"), SignUpAlumni);
router.post('/login', loginAlumni);


export default router;