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
  paymentMethod?: "credit_card" | "bkash" | "nogod" | "cash_on_delivery";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  items: IOrderItem[];
}

const orderSchema = new mongoose.Schema<IOrder>({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "bkash", "nogod", "cash_on_delivery"],
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      variant: {
        type: String,
      },
    },
  ],
});

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
