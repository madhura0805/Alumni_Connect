import Alumni from '../models/alumni.js';

export const searchAlumni = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("recieved search query",query);

    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query' });
    }

    const regexQuery = new RegExp(query, 'i');
    const numQuery = !isNaN(query) ? Number(query) : null;

    const alumni = await Alumni.find({
      $or: [
        { name: regexQuery },
        { currentCompany: regexQuery },
        { currentJobProfile: regexQuery },
        { "internships.company": regexQuery },
        { "internships.role": regexQuery },
        { yoe: numQuery },
        { graduationYear: numQuery },
        { higherEduDegree: regexQuery },
        { higherEduUniversity: regexQuery }
      ].filter(Boolean)
    });

    res.status(200).json(alumni);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const searchById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Please provide a valid alumni ID' });
    }

    const alumni = await Alumni.findById(id);

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    res.status(200).json(alumni);
  } catch (error) {
    console.error('Error fetching Alumni Data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
