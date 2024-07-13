import { Schema, model, Document } from "mongoose";
import { Post } from "../types/post";

interface PostDocument extends Post, Document {}

const postSchema = new Schema<PostDocument>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
  }, {
    timestamps: true
  });

const PostModel = model<PostDocument>('Post', postSchema);

export default PostModel;