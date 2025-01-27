import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import OrdersTab from "@/components/ManageRestaurantPage/OrdersTab";
import Spinner from "@/components/shared/Spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/components/ManageRestaurantPage/manage-restaurant-form/ManageRestaurantForm";
import { Helmet } from "react-helmet-async";;

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { restaurant, isLoading: isGetRestaurantLoading } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();
  const { orders, isLoading: isGetRestaurantOrderLoading } = useGetMyRestaurantOrders();

  if (isGetRestaurantLoading || isGetRestaurantOrderLoading) {
    return <Spinner />;
  }

  const handleSave = restaurant ? updateRestaurant : createRestaurant;
  const isLoading = isCreateLoading || isUpdateLoading;

  return (
    <>
      <Helmet>
        <title>Manage ${restaurant?.restaurantName} | Restaurant Dashboard | SolarEats | MIN THANT OO | minthantoo.com</title>
        <meta name="description" content="Manage your restaurant ${restaurant?.restaurantName} on SolarEats. Update settings, view orders, and track performance from your restaurant dashboard. SolarEats | MIN THANT OO | minthantoo.com" />
      </Helmet>
      
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="orders">View Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <OrdersTab orders={orders ?? []} />
        </TabsContent>

        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm 
            restaurant={restaurant}
            onSave={handleSave}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ManageRestaurantPage;