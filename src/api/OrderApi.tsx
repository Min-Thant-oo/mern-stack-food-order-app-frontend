import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
    cartItems: {
      menuItemId: string;
      name: string;
      quantity: string;
    }[];
    deliveryDetails: {
      email: string;
      name: string;
      addressLine1: string;
      city: string;
    };
    restaurantId: string;
};

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const createCheckoutSessionRequest = async ( checkoutSessionRequest: CheckoutSessionRequest ) => {
        const accessToken = await getAccessTokenSilently();
  
        const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutSessionRequest),
        });
  
        if (!response.ok) {
            throw new Error("Unable to create checkout session");
        }
    
        return response.json();
    };
  
    const {
        mutateAsync: createCheckoutSession,
        isLoading,
        error,
        reset,
    } = useMutation(createCheckoutSessionRequest);
  
    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        createCheckoutSession,
        isLoading,
    };
};


export const useGetMyOrders = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const getMyOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();
    
        const response = await fetch(`${API_BASE_URL}/api/order`, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
  
        if (!response.ok) {
            throw new Error("Failed to get orders");
        }
    
        return response.json();
    };
  
    const { data: orders, isLoading } = useQuery(
        "fetchMyOrders", getMyOrdersRequest,   // fetchMyOrders is a key we give to cache
        {
            refetchInterval: 3500,
        }
    );
  
    return { orders, isLoading };
};

type CancelOrderRequest = {
    orderId: string;
}

export const useCancelMyOrder = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    const cancelMyOrderRequest = async (cancelOrderRequest: CancelOrderRequest): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/order/${cancelOrderRequest.orderId}/cancel`, 
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
  
        if (!response.ok) {
            throw new Error("Failed to get orders");
        }
    
        return response.json();
    };

    const {
        mutateAsync: cancelMyOrder,
        isLoading,
        isError,
        isSuccess,
        reset,
    } = useMutation(cancelMyOrderRequest);
    
    return { cancelMyOrder, isLoading, isError, isSuccess, reset };
}