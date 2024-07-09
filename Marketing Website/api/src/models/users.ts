import { Schema, model, Document } from 'mongoose';
import { User, Role } from '../types/users';

interface UserDocument extends Document, User {} 

const userSchema = new Schema<UserDocument>({
    id: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'visit', 'client'], required: true },
});

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
