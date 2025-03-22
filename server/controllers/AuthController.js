import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Student from '../models/student.js';
import Alumni from '../models/alumni.js';
import nodemailer from 'nodemailer';

const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes
const otpStorage = new Map(); // Temporary storage for OTPs

// Setup email transporter (Replace with real credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ----- Student Signup with OTP -----
export const SignUpStudent = async (req, res) => {
  const { name, email, password, reg_no, department, otp } = req.body;

  try {
    // Check OTP
    const storedOtp = otpStorage.get(email);
    if (!storedOtp || storedOtp.otp !== otp || storedOtp.expires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Check if student already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) return res.status(400).json({ message: 'Student already exists' });

    // Create new student
    const student = new Student({ name, email, password, reg_no, department });
    await student.save();

    // Generate JWT
    const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ token, name: student.name, email: student.email, role: "student" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----- Alumni Signup with OTP -----
export const SignUpAlumni = async (req, res) => {
  const { name, email, password, yoe, role, internships, currentJobProfile, currentCompany, graduationYear, linkedinUrl, otp } = req.body;

  try {
    // Check OTP
    const storedOtp = otpStorage.get(email);
    if (!storedOtp || storedOtp.otp !== otp || storedOtp.expires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Check if alumni already exists
    const alumniExists = await Alumni.findOne({ email });
    if (alumniExists) return res.status(400).json({ message: 'Alumni already exists' });

    // Create new alumni
    const alumni = new Alumni({ name, email, password, yoe, role, internships, currentJobProfile, currentCompany, graduationYear, linkedinUrl });
    await alumni.save();

    // Generate JWT
    const token = jwt.sign({ id: alumni._id, role: "alumni" }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ token, name: alumni.name, email: alumni.email, role: "alumni" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----- Send OTP -----
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const otp = generateOTP();
    otpStorage.set(email, { otp, expires: Date.now() + OTP_EXPIRY_TIME });

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Registration',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// ----- Student Login -----
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({ token, name: student.name, email: student.email, role: "student" });
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
    if (!alumni) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: alumni._id, role: "alumni" }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({ token, name: alumni.name, email: alumni.email, role: "alumni" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
