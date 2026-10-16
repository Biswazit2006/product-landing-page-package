import mongoose from "mongoose";

export interface IUser {
    id: string;
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
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
},{
    timestamps: true,
}
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;