import mongoose from "mongoose";

export interface IOrderItem {
  productId?: mongoose.Schema.Types.ObjectId | string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface ISecurityData {
  deviceFingerprint: string;
  ipAddress: string;
  ipCity: string;
  browserOs: string;
  deviceType: "Mobile" | "Desktop";
}

export interface IOrder {
  id: mongoose.Schema.Types.ObjectId | string;
  customerId?: mongoose.Schema.Types.ObjectId | string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customerAddress: string;
  customerDistrict: string;
  variant?: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
  paymentMethod?: "credit_card" | "bkash" | "nogod" | "cash_on_delivery";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  items?: IOrderItem[];
  securityData?: ISecurityData;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
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
    customerDistrict: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
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
    securityData: {
      deviceFingerprint: {
        type: String,
        required: true,
      },
      ipAddress: {
        type: String,
        required: true,
      },
      ipCity: {
        type: String,
        required: true,
      },
      browserOs: {
        type: String,
        required: true,
      },
      deviceType: {
        type: String,
        enum: ["Mobile", "Desktop"],
        required: true,
      },
    }
  },
  {
    timestamps: true,
  },
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
