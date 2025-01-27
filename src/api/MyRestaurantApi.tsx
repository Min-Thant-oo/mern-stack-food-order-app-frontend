import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  
  const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    };

    return response.json();
  };
  
  const {
    mutate: createRestaurant,
    isLoading,
  } = useMutation({
    mutationFn: createMyRestaurantRequest,
    onSuccess: () => {
      toast.success("Restaurant Created");
    },
    onError: () => {
      toast.error("Unable to create restaurant");
    }
  });
  

  return { createRestaurant, isLoading };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant | null> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",  // fetchMyRestaurant is a name we give for getMyRestaurantRequest query
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    reset: updateReset,
    isLoading,
  } = useMutation({
    mutationFn: updateRestaurantRequest,
    onSuccess: () => {
      toast.success("Restaurant Updated");
    },
    onError: () => {
      toast.error("Unable to update restaurant");
    }
  });

  return { updateRestaurant, isLoading, updateReset};
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading, isFetching } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest,
    {
      refetchInterval: 3000,
      retry: 1,
    }
  );

  return { orders, isLoading, isFetching };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (updateStatusOrderRequest: UpdateOrderStatusRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
  } = useMutation({
    mutationFn: updateMyRestaurantOrder,
    onSuccess: () => {
      toast.success("Order status updated");
    },
    onError: () => {
      toast.error("Unable to update order status");
    }

  });

  return { updateRestaurantStatus, isLoading };
};

// type CancelMyRestaurantOrderRequest = {
//   orderId: string;
// }

// export const useCancelMyRestaurantOrder = () => {
//   const { getAccessTokenSilently } = useAuth0();
  
//   const cancelMyRestaurantOrder = async ({orderId}: CancelMyRestaurantOrderRequest) => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/restaurant/${orderId}/cancel`, 
//     {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       }
//     });

//     if (!response.ok) {
//       throw new Error("Failed to cancel orders");
//     }

//     return response.json();
// };

//   const {
//     mutateAsync: cancelOrder,
//     isLoading,
//     isError,
//     isSuccess,
//     reset,
//   } = useMutation(cancelMyRestaurantOrder);

//   return { cancelOrder, isLoading, isError, isSuccess, reset };
// }