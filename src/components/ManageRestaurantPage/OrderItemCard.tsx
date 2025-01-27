import { Order, OrderStatus } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Utensils } from "lucide-react";

type Props = {
    order: Order;
}

const OrderItemCard = ({ order }: Props) => {
    const { updateRestaurantStatus, isLoading, isSuccess, isError, reset } = useUpdateMyRestaurantOrder();
    const [status, setStatus] = useState<OrderStatus>(order.status);

    useEffect(() => {
        setStatus(order.status);
    }, [order.status]);

    useEffect(() => {
        if(isSuccess) {
            toast.success("Order updated")
        };
        reset();    // Reset the mutation state after showing the toast
    }, [isSuccess, reset]);

    useEffect(() => {
        if(isError) {
            toast.error("Unable to update order")
        }
        reset();
    }, [isError, reset]);

    const handleStatusChange = async (newStatus: OrderStatus) => {
        await updateRestaurantStatus({
            orderId: order._id as string,
            status: newStatus,
        });
        setStatus(newStatus);
    };

    const getExpectedDeliveryTime = () => {
        const orderDateTime = new Date(order.createdAt);
        
        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();
    
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
        return `${hours}:${paddedMinutes}`;
    }

    const getUpdatedTime = () => {
        const updatedAt = new Date(order.updatedAt);

        const hours = updatedAt.getHours();
        const minutes = updatedAt.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    const expecteddeliveryTimeInfo = getExpectedDeliveryTime();
    const updatedTimeInfo = getUpdatedTime();   // used both for delivered and cancelled

    
    return (
        <Card className={`${order.status === 'delivered' || order.status === 'cancelled' ? 'opacity-50 hover:opacity-100' : ''}`}>
            <CardHeader >
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>
                        Customer Name:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.name}
                        </span>
                    </div>
                    <div>
                        Delivery address:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
                        </span>
                    </div>
                    {(order.status === 'delivered' || order.status === 'cancelled') && (
                        <div>
                            {order.status === 'delivered' && 'Delivered at:'}
                            {order.status === 'cancelled' && (
                                <>
                                    Cancelled by {order.cancelledBy === 'restaurant' ? 'restaurant' : 'customer'} at: {" "}
                                </>
                            )}
                            <span className="ml-2 font-normal">
                                {updatedTimeInfo}
                            </span>
                        </div>
                    )}
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <div>
                            Expected by:
                            <span className="ml-2 font-normal">
                                {expecteddeliveryTimeInfo}
                            </span>
                        </div>
                    )}
                    <div>
                        Total Cost:
                        <span className="ml-2 font-normal">
                        ${(order.totalAmount / 100).toFixed(2)}
                        </span>
                    </div>

                </CardTitle>

                <Separator />

                <CardContent className="flex flex-col gap-6">
                    <div className="space-y-4">
                        {order.cartItems.map((cartItem, index) => (
                            <div key={cartItem.menuItemId}>
                                {index > 0 && <Separator className="my-2" />}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary" className="h-8 w-8 rounded-full p-2 flex justify-center font-bold">
                                            {cartItem.quantity}
                                        </Badge>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{cartItem.name}</span>
                                            {cartItem.price && (
                                                <span className="text-sm text-muted-foreground">
                                                    ${(cartItem.price * cartItem.quantity / 100).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Utensils className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className={`flex flex-col space-y-1.5 ${status === 'delivered' || status === 'cancelled' ? 'pointer-events-none' : ''}`}>
                        <Label htmlFor="status">
                            What is the status of this order? 
                        </Label>
                            <Select
                                value={status}
                                disabled={isLoading || status === 'delivered' || status === 'cancelled'}
                                onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {ORDER_STATUS.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default OrderItemCard;