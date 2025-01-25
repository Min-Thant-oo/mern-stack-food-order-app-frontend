import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import Spinner from "@/components/Spinner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();

    if (isLoading) {
        return <Spinner />;
    }

    if (!orders || orders.length === 0) {
        return "No orders found";
    }

    const activeOrders = orders.filter((order) => order.status !== 'delivered' && order.status !== 'cancelled');
    const pastOrders = orders.filter((order) => order.status === 'delivered' || order.status === 'cancelled');

    return (
        <div className="gap-10">
            {activeOrders.length > 0 && (
            <>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeOrders.length} active {activeOrders?.length === 1 ? 'order' : 'orders'}</h2>
                {activeOrders.map((order) => (
                    <div key={order._id} className="space-y-10 mb-6 bg-gray-100 p-10 rounded-lg">
                        <OrderStatusHeader order={order} />
                        <div className="grid gap-10 md:grid-cols-2">
                            <OrderStatusDetail order={order} />
                            <AspectRatio ratio={16 / 5}>
                                <Link to={`/detail/${order.restaurant._id}`}>
                                    <img
                                        src={order.restaurant.imageUrl}
                                        className="rounded-md object-cover h-full w-full"
                                    />
                                </Link>
                            </AspectRatio>
                        </div>
                    </div>
                ))}
            </>
            )}

            {activeOrders.length > 0 && pastOrders.length > 0 && (
                <Separator className="my-10" />
            )}

            {pastOrders.length > 0 && (
            <>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{pastOrders.length} past {pastOrders?.length === 1 ? 'order' : 'orders'}</h2>
                {pastOrders.map((order) => (
                    <div key={order._id} className='space-y-10 mb-6 p-10 rounded-lg bg-gray-200 hover:bg-gray-100 opacity-50 hover:opacity-100'>
                        <OrderStatusHeader order={order} />
                        <div className="grid gap-10 md:grid-cols-2">
                            <OrderStatusDetail order={order} />
                            <AspectRatio ratio={16 / 5}>
                                <Link to={`/detail/${order.restaurant._id}`}>
                                    <img
                                        src={order.restaurant.imageUrl}
                                        className="rounded-md object-cover h-full w-full"
                                    />
                                </Link>
                            </AspectRatio>
                        </div>
                    </div>
                ))}
            </>
            )}
        </div>
    );
};

export default OrderStatusPage;