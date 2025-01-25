// use in api folder for the type of the reponse back from server

export type User = {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
};


export type MenuItem = {
    _id: string;
    name: string;
    price: number;
};

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
};

export type RestaurantSearchResponse = {
    data: Restaurant[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
};

export type OrderStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered" | "cancelled";

export type Order = {
    _id: string;
    restaurant: Restaurant;
    user: User;
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: number;
        price: number;
    }[];
    deliveryDetails: {
        name: string;
        addressLine1: string;
        city: string;
        email: string;
    };
    subTotal: number;
    deliveryPrice: number;
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    restaurantId: string;
};