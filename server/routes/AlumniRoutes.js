import express from 'express';
import alumni from '../models/alumni.js'; // Adjust the import if necessary

const router = express.Router();

router.get('/alumni-count', async (req, res) => {
  try {
    const alumniData = await alumni.aggregate([
      { $group: { _id: "$currentCompany", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(alumniData);  // Send the response with alumni count
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
