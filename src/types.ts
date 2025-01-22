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

export type deliveryStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";

export type paymentStatus = "unpaid" | "paid" | "refunded";

export type Order = {
    _id: string;
    restaurant: Restaurant;
    user: User;
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        name: string;
        addressLine1: string;
        city: string;
        email: string;
    };
    totalAmount: number;
    deliveryStatus: deliveryStatus;
    paymentStatus: paymentStatus;
    createdAt: string;
    restaurantId: string;
};