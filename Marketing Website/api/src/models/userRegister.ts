import { Schema, model, Document, Types } from "mongoose";
import { Role } from "../types/users";

interface UserRegisterDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    post: Types.ObjectId[]; 
}

const userRegisterSchema = new Schema<UserRegisterDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'visit', 'client'], required: true },
    post: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, {
    timestamps: true
});

const UserRegisterModel = model<UserRegisterDocument>('UserRegister', userRegisterSchema);

export default UserRegisterModel;