import { Router } from 'express';

import { createPost, deletePost, editPost } from '../controllers/postControllers.js';
// import AuthMiddleware from '../middleware/AuthMiddleware.js';

const router = Router();

router.post('/', createPost); 
router.patch('/:id',  editPost); 
router.delete('/:id', deletePost); 

export default router;
