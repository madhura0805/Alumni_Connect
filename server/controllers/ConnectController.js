import Alumni from '../models/alumni.js';

export async function ConnectController(req, res) {
    try {
        const AlumniData = await Alumni.find();
        if (AlumniData.length > 0) {
            return res.status(200).json(AlumniData);  // 200 OK, returning data
        } else {
            return res.status(404).json({ message: 'No alumni found' });  // 404 if no data
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Alumni Data' });
    }
}

export default ConnectController;
