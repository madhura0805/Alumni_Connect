import express from 'express';
import ConnectController from '../controllers/ConnectController.js';
// import {protect} from '../middlewares/AuthMiddleware.js';
const router = express.Router();

router.get("/connect",ConnectController);

export default router;