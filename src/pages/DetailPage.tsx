import { useGetRestaurant } from "@/api/RestaurantApi";
import Spinner from "@/components/shared/Spinner";
import { useParams } from "react-router-dom"
import { AspectRatio } from '@/components/ui/aspect-ratio';
import RestaurantInfo from "@/components/DetailPage/RestaurantInfo";
import MenuItem from "@/components/DetailPage/MenuItem";
import { useState } from "react";
import OrderSummary from '@/components/DetailPage/OrderSummary';
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem as MenuItemType } from "@/types";
import CheckoutButton from "@/components/DetailPage/CheckoutButton";
import { UserFormData } from "@/components/shared/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { Helmet } from "react-helmet-async";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            // 1. check if the item is already in cart
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id
            );

            let updatedCartItems;

            // 2. if item is already in cart, update the quantity
            if(existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) => 
                    cartItem._id === menuItem._id 
                        ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                        : cartItem
                );
            } else {
                // 3. if item is not in cart, add it as a new item
                updatedCartItems = [
                    // update the object in prevCartItems 
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    }
                ]
            }

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    };


    
const decrementCartItem = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
        const existingCartItem = prevCartItems.find(
            (cartItem) => cartItem._id === menuItem._id
        );

        if (!existingCartItem) return prevCartItems;

        let updatedCartItems;

        if (existingCartItem.quantity === 1) {
            updatedCartItems = prevCartItems.filter(
                (cartItem) => cartItem._id !== menuItem._id
            );
        } else {
            updatedCartItems = prevCartItems.map((cartItem) =>
                cartItem._id === menuItem._id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        }

        sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
        return updatedCartItems;
    });
};

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            );

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
    
            return updatedCartItems;
        });
    };

    const onCheckout = async (userFormData: UserFormData) => {
        if (!restaurant) {
          return;
        }
    
        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
                price: cartItem.price,
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string,
            },
        };
    
        const data = await createCheckoutSession(checkoutData);
        window.location.href = data.url;

        sessionStorage.removeItem(`cartItems-${restaurantId}`);
    };

    if(isLoading || !restaurant) {
        return <Spinner />;
    };

    return (
        <>
            <Helmet>
                <title>{restaurant.restaurantName} in {restaurant.city} | SolarEats | MIN THANT OO | minthantoo.com</title>
                <meta name="description" content={`Order best ${restaurant.cuisines.slice(0,3).join(', ')} cuisines from ${restaurant.restaurantName} in ${restaurant.city}.  SolarEats | MIN THANT OO | minthantoo.com`} />
            </Helmet>

            <div className="flex flex-col gap-10">
                <AspectRatio ratio={16/ 5}>
                    <img 
                        src={restaurant.imageUrl}
                        className="rounded-md object-cover h-full w-full"
                    />
                </AspectRatio>
                <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                    <div className="flex flex-col gap-4">
                        <RestaurantInfo restaurant={restaurant} />
                        <span className="text-2xl font-bold tracking-tight">Menu</span>
                        {restaurant.menuItems.map((menuItem) => {
                            const cartItem = cartItems.find((item) => item._id === menuItem._id);
                            return (
                                <MenuItem 
                                    key={menuItem._id} 
                                    menuItem={menuItem}
                                    quantity={cartItem?.quantity || 0}
                                    onIncrement={() => addToCart(menuItem)}
                                    onDecrement={() => decrementCartItem(menuItem)}
                                />
                            );
                        })}
                    </div>

                    <div>
                        <Card>
                            <OrderSummary 
                                restaurant={restaurant} 
                                cartItems={cartItems} 
                                removeFromCart={removeFromCart} 
                            />
                            <CardFooter>
                                <CheckoutButton 
                                    disabled={cartItems.length === 0} 
                                    onCheckout={onCheckout}
                                    isLoading={isCheckoutLoading}
                                />
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPage;