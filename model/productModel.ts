import mongoose from "mongoose";

// Define the structure for a product
export interface IProduct {
  id: string | mongoose.Types.ObjectId;
  name: string;
  price: number;
  variants:string[];
  stock: number;
  deliveryCharge: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema for a product
const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  variants: { type: [String], required: true },
  deliveryCharge: { type: Number, required: true },
},{
  timestamps: true,
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;