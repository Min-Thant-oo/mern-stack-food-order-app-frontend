import { Order } from '@/types';
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {

    const getExpectedDeliveryTime = () => {
        const createdAt = new Date(order.createdAt);

        // Add the estimated delivery time to the order created time
        createdAt.setMinutes(createdAt.getMinutes() + order.restaurant.estimatedDeliveryTime);

        const hours = createdAt.getHours();
        const minutes = createdAt.getMinutes();

        // Pad minutes with a leading zero if less than 10
        // For example, 12:08 instead of 12:8
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    const getOrderStatusInfo = () => {
        return (
            ORDER_STATUS.find((orderStatus) => orderStatus.value === order.status) || ORDER_STATUS[0]
        );
    };

    const orderStatusInfo = getOrderStatusInfo();
    const deliveryTimeInfo = getExpectedDeliveryTime();

    return (
        <>
            <h1 className="tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span className='text-2xl font-semibold flex items-center justify-between md:justify-start md:block'> 
                    Order Status: <span className={`text-3xl font-bold text-right ${orderStatusInfo.color} ${orderStatusInfo.textColor} p-1 rounded`}>{orderStatusInfo.label}</span>
                </span>
                {order.status !== 'delivered' && (
                <span className='text-2xl font-semibold flex items-center justify-between md:justify-start md:block'> 
                    Expected by: <span className='text-3xl font-bold'>{deliveryTimeInfo}</span>
                </span>
                )}
            </h1>
            <Progress
                className="animate-pulse"
                value={orderStatusInfo.progressValue}
                indicatorColor={orderStatusInfo.color}
            />
        </>
    );
};

export default OrderStatusHeader;