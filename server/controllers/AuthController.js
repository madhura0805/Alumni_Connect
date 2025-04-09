import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Student from '../models/student.js';
import Alumni from '../models/alumni.js';
import dotenv from 'dotenv';
import transporter from '../services/emailService.js';

dotenv.config(); // Load environment variables

const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes
const otpStorage = new Map(); // Temporary storage for OTPs

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ----- Send OTP -----
export const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const otp = generateOTP();
    otpStorage.set(email, { otp, expires: Date.now() + OTP_EXPIRY_TIME });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Registration',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// ----- Verify OTP -----
const verifyOTP = (email, otp) => {
  const storedOtp = otpStorage.get(email);
  if (!storedOtp || storedOtp.otp !== otp || storedOtp.expires < Date.now()) {
    return false;
  }
  otpStorage.delete(email); // Remove OTP after use
  return true;
};

// ----- Student Signup -----
export const SignUpStudent = async (req, res) => {
  const { name, email, password, reg_no, department, otp } = req.body;
  if (!name || !email || !password || !reg_no || !department || !otp) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (!verifyOTP(email, otp)) return res.status(400).json({ message: 'Invalid or expired OTP' });

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).json({ message: 'Student already exists' });

  
    const student = new Student({ name, email, password: password, reg_no, department });
    await student.save();

    const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ token, name: student.name, email: student.email, role: 'student' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ----- Alumni Signup -----
export const SignUpAlumni = async (req, res) => {
  console.log('Received Form Data:', req.body);
  console.log('Uploaded File:', req.file);

  const {
    name, email, password, yoe, currentJobProfile, currentCompany,
    graduationYear, linkedinUrl, otp, higherEduDegree, higherEduUniversity,
    internshipCompany, internshipRole
  } = req.body;

  if (!name || !email || !password || !yoe || !currentJobProfile || !currentCompany || !graduationYear || !linkedinUrl || !otp) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (!verifyOTP(email, otp)) return res.status(400).json({ message: 'Invalid or expired OTP' });

    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) return res.status(400).json({ message: 'Alumni already exists' });

    const profileImageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    const internships = internshipCompany && internshipRole ? [{ company: internshipCompany, role: internshipRole }] : [];

    const alumni = new Alumni({
      name, email, password: password, yoe, currentJobProfile, currentCompany,
      graduationYear, linkedinUrl, higherEduDegree, higherEduUniversity, internships,
      imageUrl: profileImageUrl,
    });

    await alumni.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// ----- Student Login -----
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });

    console.log('Stored Hashed Password:', student.password);
    console.log('Entered Password:', password);

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({ token, name: student.name, email: student.email, role: 'student' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ----- Alumni Login -----
export const loginAlumni = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    console.log('Login attempt for email:', email);

    const alumni = await Alumni.findOne({ email });
    if (!alumni) {
      console.log('Alumni not found in database:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Stored Hashed Password:', alumni.password);
    console.log('Entered Password:', password);

    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) {
      console.log('Password does not match for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: alumni._id, role: 'alumni' }, process.env.JWT_SECRET, { expiresIn: '30d' });

    console.log('Login successful for:', email);
    res.json({ token, name: alumni.name, email: alumni.email, role: 'alumni' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};