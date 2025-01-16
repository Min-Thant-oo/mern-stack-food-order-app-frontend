import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useSearchRestaurants = (city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
  
      const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`);
  
      if (!response.ok) {
        throw new Error("Failed to get restaurant");
      }
  
      return response.json();
    };
  
    const { data: results, isLoading } = useQuery(
      ["searchRestaurants"],
      createSearchRequest,
      { 
        enabled: !!city,   //this ensures that this query will not run unless we get truthy value or string value of city
        retry: 1  // Will retry 2 times after initial failure (3 total attempts)
      } 
    );
  
    return {
      results,
      isLoading,
    };
  };