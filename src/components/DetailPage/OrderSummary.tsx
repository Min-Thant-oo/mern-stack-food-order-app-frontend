import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types"
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Trash } from "lucide-react";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cart: CartItem) => void;
}

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
    
    const getTotalCost = () => {
        const totalInCent = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity, 
            0
        );

        // Ensure deliveryPrice is treated as number using Number()
        const totalWithDelivery = totalInCent + Number(restaurant.deliveryPrice);

        // Only include delivery price if there are items in the cart
        if(totalInCent) {
            // Convert the final total from cents to dollars
            return (totalWithDelivery / 100).toFixed(2);
        }

        // without delivery price
        return 0;

    };

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <div key={item.name} className="flex justify-between">
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash className="cursor-pointer" color="red" size={20} onClick={() => removeFromCart(item)} />
                            ${((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                    </div>
                ))}

                <Separator />

                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>

                <Separator />
            </CardContent>
        </>
    )
}

export default OrderSummary;