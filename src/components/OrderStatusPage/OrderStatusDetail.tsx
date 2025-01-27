import { Order } from "@/types";
import { Separator } from "../ui/separator";

type Props = {
    order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <span className="font-bold">Delivering to:</span>
                <div className="flex flex-col text-right font-mono">
                    <span>{order.deliveryDetails.name}</span>
                    <span>
                        {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
                    </span>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col">
                <span className="font-bold">Your Order</span>
                <ul className="">
                    {order.cartItems.map((item) => (
                        <li key={item.menuItemId}>
                            <div className="font-mono flex justify-between">
                                <span>{item.name}</span>
                                <div>
                                    <span>{item.quantity}</span> x{" "} <span>${(item.price / 100).toFixed(2)}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Separator />
            <div className="flex flex-col space-y-3">
                <div className="flex justify-between">
                    <span className="font-bold">Sub Total:</span>
                    <span className="font-mono">${(order.subTotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold">Delivery Price:</span>
                    <span className="font-mono">${(order.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-mono font-bold">${(order.totalAmount / 100).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusDetail;