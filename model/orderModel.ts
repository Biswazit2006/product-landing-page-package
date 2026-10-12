import mongoose from "mongoose";

export interface IOrderItem {
    productId?: mongoose.Schema.Types.ObjectId | string;
    quantity: number;
    price: number;
    variant?: string;
}

export interface IOrder {
    customerId?: mongoose.Schema.Types.ObjectId | string;
    customerName: string;
    customerEmail?: string;
    customerPhone: string;
    customerAddress: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
    paymentMethod?: "credit_card" | "paypal" | "bank_transfer" | "cash_on_delivery";
    paymentStatus?: "pending" | "paid" | "failed" | "refunded";
    items: IOrderItem[];
}

const productSchema = new mongoose.Schema<IOrder>({
});

const Product = mongoose.models.Product || mongoose.model<IOrder>('Product', productSchema);

export default Product;