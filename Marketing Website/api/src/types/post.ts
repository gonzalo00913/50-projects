import { Types } from "mongoose";

export interface Post {
    title: string;
    image: string;
    description: string;
    createdBy: Types.ObjectId;
}