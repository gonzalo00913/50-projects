import { Schema, model, Document, Types } from "mongoose";
import { Post } from "../types/post";


interface PostDocument extends Post, Document {
  createdBy: Types.ObjectId; 
}


const postSchema = new Schema<PostDocument>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // relacion con el modelo usuario
  }, {
    timestamps: true
  });

const PostModel = model<PostDocument>('Post', postSchema);

export default PostModel;