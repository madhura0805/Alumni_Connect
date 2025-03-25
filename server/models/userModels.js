import mongoose from 'mongoose';
import  {Schema,model} from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ["student", "alumni"], required: true }, // NEW FIELD
    posts: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);
export default User;
