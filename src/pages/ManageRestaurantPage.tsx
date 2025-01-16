import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import Spinner from "@/components/Spinner";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import { Helmet } from "react-helmet-async";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { restaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  // Show spinner while loading restaurant data
  if(isGetLoading) {
    return <Spinner />;
  }
  
  // editing mode if restaurant is not null
  // null = no restaurant for this user = createRestaurant mode
  const isEditing = restaurant !== null;
  
  return (
    <>
      <Helmet>
        <title>Manage Restaurant | SolarEats</title>
        <meta name="description" content="Manage your restaurant settings" />
      </Helmet>
      
      <ManageRestaurantForm 
        restaurant={restaurant} 
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={isCreateLoading || isUpdateLoading}
      />
    </>
  )
}

export default ManageRestaurantPage