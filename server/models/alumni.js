import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const alumniSchema = new mongoose.Schema({
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
  yoe: {
    type: Number,
    default: 0,
  },
  currentJobProfile: {
    type: String,
  },
  currentCompany: {
    type: String,
    required: true,
  },
  linkedinUrl: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/.test(value);
      },
      message: "Please enter a valid LinkedIn profile URL",
    },
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  higherEduDegree: {
    type: String,
  },
  higherEduUniversity: {
    type: String,
  },
  internships: [{
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    }
  }]
}, { timestamps: true });

// Pre-save hook to hash the password
alumniSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords
alumniSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Alumni", alumniSchema);
