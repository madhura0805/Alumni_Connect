import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique emails
  },
  password: {
    type: String,
    required: true,
  },
  reg_no: {
    type: String,
    required: true,
    unique: true, // Ensure unique registration numbers
  },
  department: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt & updatedAt fields

// Pre-save hook to hash the password
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Student", studentSchema);
