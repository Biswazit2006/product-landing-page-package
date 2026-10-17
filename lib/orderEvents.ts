// lib/orderEvents.ts
import { EventEmitter } from "events";

declare global {
  var orderEmitter: EventEmitter | undefined;
}

// Next.js hot-reloading এ যেন ডুপ্লিকেট ইনস্ট্যান্স তৈরি না হয়
export const orderEvents = global.orderEmitter || new EventEmitter();

if (process.env.NODE_ENV !== "production") {
  global.orderEmitter = orderEvents;
}