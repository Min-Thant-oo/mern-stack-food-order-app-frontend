import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import Spinner from "@/components/Spinner";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { restaurant, isLoading: isGetLoading, refetch } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  // when the page refresh
  if(isGetLoading) {
    return <Spinner />;
  }

  // editing mode if there is not useGetMyRestaurant
  const isEditing = !!restaurant;

  // const handleSave = (formData: FormData) => {
  //   if (isEditing) {
  //     updateRestaurant(formData);
  //   } else {
  //     createRestaurant(formData);
  //   }
  //   // Refetch the restaurant data after the save
  //   refetch();
  // };
  
  return (
    <ManageRestaurantForm 
      restaurant={restaurant} 
      onSave={isEditing ? updateRestaurant : createRestaurant} 
      isLoading={isCreateLoading || isUpdateLoading}
    />
  )
}

export default ManageRestaurantPage