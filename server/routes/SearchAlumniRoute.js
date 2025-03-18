import express from 'express';
import { searchAlumni, searchById } from '../controllers/searchController.js';

const router = express.Router();

router.get("/", searchAlumni);  // Handles query-based search: `/api/search?query=xyz`
router.get("/id/:id", searchById);  // Handles search by ID: `/api/search/id/123`

export default router;
