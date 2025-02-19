import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
    const { control, watch, setValue } = useFormContext();

    const existingImageUrl = watch("imageUrl");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const imageUrl = URL.createObjectURL(file);  // Create a temporary URL for the image
            setValue("imageFile", file);  // Update the image file field
            setValue("imageUrl", imageUrl);  // Update the image URL for the preview
        }
    };

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>
                    Add an image that will be displayed on your restaurant listing in the
                    search results. Adding a new image will overwrite the existing one.
                </FormDescription>
            </div>

            <div className="flex flex-col gap-8 md:w-[50%]">
            {existingImageUrl && (
                <AspectRatio ratio={16 / 9}>
                    <img
                        src={existingImageUrl}
                        className="rounded-md object-cover h-full w-full"
                    />
                </AspectRatio>
            )}
                <FormField
                    control={control}
                    name="imageFile"
                    render={() => (
                    <FormItem>
                        <FormControl>
                            <Input
                                className="bg-white"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleImageChange}
                                // onChange={(event) =>
                                //     field.onChange(
                                //         event.target.files ? event.target.files[0] : null  // take only the first file user selected. set it to null if user didn't select any files 
                                //     )
                                // }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default ImageSection;