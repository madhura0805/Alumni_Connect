// AuthController.js
import jwt from 'jsonwebtoken';
import Student from '../models/student.js';
import Alumni from '../models/alumni.js';

// ----- Student Signup -----
export const SignUpStudent = async (req, res) => {
  const { name, email, password, reg_no, department } = req.body;
  try {
    // Check if the student already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Create a new student and save to the database
    const student = new Student({ name, email, password ,reg_no, department });
    await student.save();

    // Generate a JWT token for the newly created student
    const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, {
      expiresIn: '30d',  // Token expires in 30 days
    });

    res.status(201).json({
      token,
      name: student.name,
      email: student.email,
      role: "student"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----- Alumni Signup -----
export const SignUpAlumni = async (req, res) => {
  const { name, email,password, yoe,role, internships, currentJobProfile, currentCompany, graduationYear,linkedinUrl} = req.body;
  try {
    // Check if the alumni already exists
    const alumniExists = await Alumni.findOne({ email });
    if (alumniExists) {
      return res.status(400).json({ message: 'Alumni already exists' });
    }

    // Create a new alumni and save to the database
    const alumni = new Alumni({ name,yoe, email,password, role, internships, currentJobProfile, currentCompany, graduationYear,linkedinUrl });
    await alumni.save();

    // Generate a JWT token for the newly created alumni
    const token = jwt.sign({ id: alumni._id, role: "alumni" }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      token,
      name: alumni.name,
      email: alumni.email,
      role: "alumni"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----- Student Login -----
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.json({
      token,
      name: student.name,
      email: student.email,
      role: "student"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----- Alumni Login -----
export const loginAlumni = async (req, res) => {
  const { email, password } = req.body;
  try {
    const alumni = await Alumni.findOne({ email });
    if (!alumni) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await alumni.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: alumni._id, role: "alumni" }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.json({
      token,
      name: alumni.name,
      email: alumni.email,
      role: "alumni"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
