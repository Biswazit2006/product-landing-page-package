import mongoose from "mongoose";
// Define the structure for a product variant option
export interface IvariantOption {
  option: string;
  price?: number;
  stock?: number;
}

// Define the structure for a product variant
export interface Ivariant{
  variant: string;
  options: IvariantOption[];
}

// Define the structure for a product
export interface IProduct {
  id?: string | mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  variants?: Ivariant[];
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema for a product
const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnailUrl: { type: String, required: true },
  stock: { type: Number, required: true },
  variants:{ type: [Object], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;