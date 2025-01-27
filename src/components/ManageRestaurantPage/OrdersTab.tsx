import { Order } from "@/types";
import OrderItemCard from "./OrderItemCard";

type Props = {
    orders: Order[];
}

const OrdersTab = ({ orders }: Props) => {
    const activeOrders = orders.filter(order => !['delivered', 'cancelled'].includes(order.status));
    const pastOrders = orders.filter(order => ['delivered', 'cancelled'].includes(order.status));
  
    if (!orders.length) {
        return (
            <div className="mt-4">
                <h2 className="ml-2 font-semibold">You don't have any orders yet.</h2>
            </div>
        );
    }
  
    return (
        <div className="space-y-8">
            {activeOrders?.length > 0 && (
                <div className="bg-gray-50 space-y-5 p-10 rounded-lg">
                    <h2 className="text-2xl font-bold">{`${activeOrders.length} active ${activeOrders.length === 1 ? 'order' : 'orders'}`}</h2>
                    {activeOrders.map(order => (
                        <OrderItemCard order={order} key={order._id} />
                    ))}
                </div>
            )}
            
            {pastOrders?.length > 0 && (
                <div className="bg-gray-50 space-y-5 p-10 rounded-lg">
                    <h2 className="text-2xl font-bold">{`${pastOrders.length} past ${pastOrders.length === 1 ? 'order' : 'orders'}`}</h2>
                    {pastOrders.map(order => (
                        <OrderItemCard order={order} key={order._id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersTab;