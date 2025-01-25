import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import Spinner from "@/components/Spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import { Helmet } from "react-helmet-async";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { restaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();

  // Show spinner while loading restaurant data
  if(isGetLoading) {
    return <Spinner />;
  }
  
  // editing mode if restaurant is not null
  // null = no restaurant for this user = createRestaurant mode
  const isEditing = restaurant !== null;

  if (!orders || orders.length === 0) {
    return "No orders found";
  }
  
  const activeOrders = orders.filter((order) => order.status !== 'delivered' && order.status !== 'cancelled');
  const pastOrders = orders.filter((order) => order.status === 'delivered' || order.status === 'cancelled');
  
  return (
    <>
      <Helmet>
        <title>Manage Restaurant | SolarEats</title>
        <meta name="description" content="Manage your restaurant settings" />
      </Helmet>
      
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">View Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="">
          {activeOrders.length > 0 && (
            <div className="bg-gray-50 space-y-5 p-10 rounded-lg mb-10">
              <h2 className="text-2xl font-bold">{activeOrders?.length} active {activeOrders?.length === 1 ? 'order' : 'orders'}</h2>
              {activeOrders?.map((order) => (
                <OrderItemCard order={order} key={order._id} />
              ))}
            </div>
          )}

          {pastOrders.length > 0 && (
            <div className="bg-gray-50 space-y-5 p-10 rounded-lg">
              <h2 className="text-2xl font-bold">{pastOrders?.length} past {pastOrders?.length === 1 ? 'order' : 'orders'}</h2>
              {pastOrders?.map((order) => (
                <OrderItemCard order={order} key={order._id} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="manage-restaurant">
            <ManageRestaurantForm 
              restaurant={restaurant} 
              onSave={isEditing ? updateRestaurant : createRestaurant}
              isLoading={isCreateLoading || isUpdateLoading}
            />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default ManageRestaurantPage