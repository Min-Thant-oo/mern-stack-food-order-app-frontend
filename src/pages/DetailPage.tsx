import { useGetRestaurant } from "@/api/RestaurantApi";
import Spinner from "@/components/Spinner";
import { useParams } from "react-router-dom"
import { AspectRatio } from '@/components/ui/aspect-ratio';
import RestaurantInfo from "@/components/RestaurantInfo";
import MenuItem from "@/components/MenuItem";

const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);

    if(isLoading || !restaurant) {
        return <Spinner />;
    };

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16/ 5}>
                <img 
                    src={restaurant.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr-2ft] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => 
                        <MenuItem key={menuItem.name} menuItem={menuItem} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetailPage;