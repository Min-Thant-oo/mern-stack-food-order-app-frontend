import { Order } from '@/types';
import { Progress } from "../ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useCancelMyOrder } from '@/api/OrderApi';
import { toast } from 'sonner';
  

type Props = {
    order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { cancelMyOrder, isLoading, isError, isSuccess, reset } = useCancelMyOrder();

    useEffect(() => {
        if(isSuccess) {
            toast.success("Order cancelled")
        };
        reset();    // Reset the mutation state after showing the toast
    }, [isSuccess, reset]);

    useEffect(() => {
        if(isError) {
            toast.error("Error cancelling your order. Try again.")
        }
        reset();
    }, [isError, reset]);

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

    const getUpdatedTime = () => {
        const updatedAt = new Date(order.updatedAt);

        const hours = updatedAt.getHours();
        const minutes = updatedAt.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    const getOrderStatusInfo = () => {
        return (
            ORDER_STATUS.find((orderStatus) => orderStatus.value === order.status) || ORDER_STATUS[0]
        );
    };

    const orderStatusInfo = getOrderStatusInfo();
    const expecteddeliveryTimeInfo = getExpectedDeliveryTime();
    const updatedTimeInfo = getUpdatedTime();   // used both for delivered and cancelled

    const handleCancelOrder = async () => {
        await cancelMyOrder({ orderId: order._id });
    }

    return (
        <>
            <div className="tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span className='text-2xl font-semibold flex items-center justify-between md:justify-start md:block'> 
                    Order Status: <span className={` font-bold text-right p-1 rounded`}>{orderStatusInfo.label}</span>
                </span>
                <div className='flex flex-col gap-5'>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <span className='text-2xl font-semibold flex items-center justify-between md:justify-start md:block'> 
                        Expected by: <span className='ml-1 md:ml-0'>{expecteddeliveryTimeInfo}</span>
                    </span>
                    )}
                    {(order.status === 'delivered' || order.status === 'cancelled') && (
                        <span className='text-2xl font-semibold'> 
                            {order.status === 'delivered' && 'Delivered at: '}
                            {order.status === 'cancelled' && (
                                <>
                                    Cancelled by {order.cancelledBy === 'customer' ? 'you' : 'restaurant'} at: {" "}
                                </>
                            )}
                            <span className='ml-1 md:ml-0'>{updatedTimeInfo}</span>
                        </span>
                    )}
                    {order.status !== "cancelled" && order.status !== "delivered" && (
                        <button
                            className="bg-red-500 text-white px-4 py-2 text-lg font-semibold rounded hover:bg-red-600"
                            onClick={() => setIsOpen(true)}
                            disabled={isLoading}
                        >
                            Cancel Order
                        </button>
                    )}
                </div>
            </div>
            <Progress
                className="animate-pulse"
                value={orderStatusInfo.progressValue}
                indicatorColor={orderStatusInfo.color}
            />

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This refund will be processed and the total amount will be refunded.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500" onClick={handleCancelOrder}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default OrderStatusHeader;