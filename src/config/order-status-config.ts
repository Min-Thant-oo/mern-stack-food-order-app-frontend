import { OrderStatus } from "@/types";

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
  color: string;
  textColor: string;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { 
    label: "Placed", 
    value: "placed", 
    progressValue: 0, 
    color: "bg-gray-300",
    textColor: "text-black",
  },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "paid",
    progressValue: 25,
    color: "bg-gray-500", 
    textColor: "text-white"
  },
  { 
    label: "Confirmed. Preparing Order", 
    value: "inProgress", 
    progressValue: 50,
    color: "bg-orange-500",
    textColor: "text-white"
  },
  { 
    label: "Out for Delivery", 
    value: "outForDelivery", 
    progressValue: 75,
    color: "bg-orange-600", 
    textColor: "text-white"
  },
  { 
    label: "Delivered", 
    value: "delivered", 
    progressValue: 100,
    color: "bg-green-500",
    textColor: "text-white"
  },
  { 
    label: "Order Cancelled (Refunded)", 
    value: "cancelled",
    progressValue: 100,
    color: "bg-red-500",
    textColor: "text-white"
  },
];