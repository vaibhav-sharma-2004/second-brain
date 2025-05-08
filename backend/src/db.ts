import { model,Schema } from "mongoose";
import mongoose from "mongoose";
import {MONGO_URL} from  "./config"
mongoose.connect(MONGO_URL)

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    });

  export const userModel=model('User', userSchema);

const contentSchema = new Schema({
  title: String,
  link: String,
  tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
  type: String,
  userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

export const contentModel=model('Content', contentSchema);

const LinkSchema = new Schema({
  hash:String,
  userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true }
});
export const LinkModel=model('Link', LinkSchema);