import mongoose from "mongoose";

export interface IUser {
    id?:mongoose.ObjectId;
    name: string;
    email?: string;
    phone?: string;
    password: string;
    avatar?: string;
    role: "customer" | "admin" | "moderator" ;
    cart?: mongoose.Schema.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin", "moderator"], default: "customer" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;