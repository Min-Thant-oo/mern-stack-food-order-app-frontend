import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import { Separator } from "@/components/ui/separator";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required",
  }).min(1, "Restaurant name is required"),
  city: z.string({
    required_error: "City is required",
  }).min(1, "City is required"),
  country: z.string({
    required_error: "Country is required",
  }).min(1, "Country is required"),
  deliveryPrice: z.coerce
    .number({
      required_error: "Delivery price is required",
      invalid_type_error: "Delivery price must be a valid number",
    })
    .min(0, "Delivery price cannot be negative")
    .max(10000, "Delivery price cannot exceed $10,000"),
  estimatedDeliveryTime: z.coerce
    .number({
      required_error: "Estimated delivery time is required",
      invalid_type_error: "Estimated delivery time must be a valid number",
    })
    .min(1, "Delivery time must be at least 1 minute")
    .max(240, "Delivery time cannot exceed 4 hours")
    .refine((value) => Number.isInteger(value), {
      message: "Estimated delivery time must be a whole number",
    }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one cuisine",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      price: z.coerce
        .number({
          required_error: "Price is required",
          invalid_type_error: "Price must be a valid number",
        })
        .min(0.01, "Price must be greater than $0")
        .max(10000, "Price cannot exceed $10,000"),
    })
  ),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, { message: "image is required" }).optional(),
})
.refine((data) => data.imageUrl || data.imageFile, {
  message: "Either image URL or image File must be provided",
  path: ["imageFile"],
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
    restaurant?: Restaurant | null;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
      imageFile: undefined,
    },
    mode: "onTouched"  // This will show validation errors when fields are touched and then blurred
  });


  useEffect(() => {
    if(!restaurant) {
      return; // Skip if no restaurant data
    }

    // formatting price from lowest domination to normal since we saved cents in the DB
    // toFixed changed it from number to string
    // so use parseInt to change it back from string to number
    const deliveryPriceFormatted = parseFloat(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseFloat((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);
  

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()  // to turn the value into Cent
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()   // to turn the value into Cent
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
          <DetailsSection /> 
            <Separator />
          <CuisinesSection />
            <Separator />
          <MenuSection />
            <Separator />
          <ImageSection />
          {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
        </form>
    </Form>
  )
}

export default ManageRestaurantForm