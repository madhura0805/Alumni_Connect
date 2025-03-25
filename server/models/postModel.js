import mongoose from 'mongoose';
import  {Schema,model} from "mongoose";

const postSchema = new Schema({
    title:{type :String,required:true},
    category:{type :String,enum:["Agriculture","Business"],message:"{Value is not supported"},
    description:{type :String,required:true},
    creator:{type :Schema.Types.ObjectId,ref:"User"},
    title:{type :String,required:true},
    thumbnail:{type :String,required:true},
},{timestamp :true})

const Post = mongoose.model("Post", postSchema);
export default Post;