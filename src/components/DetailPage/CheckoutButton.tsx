import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import LoadingButton from "../shared/LoadingButton";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import UserProfileForm from "@/components/shared/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { UserFormData } from '../shared/user-profile-form/UserProfileForm';

type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    disabled: boolean;
    isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
    const { pathname } = useLocation();
    const { currentUser, isLoading : isGetUserLoading } = useGetMyUser(isAuthenticated);   // if isAuthenticated is true, then fetch current user

    // Redirect user to login and store the current page in appState
    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            },
        });
    };

    if (!isAuthenticated) {
        return (
            <Button onClick={onLogin} className="bg-orange-500 flex-1">
                Log in to check out
            </Button>
        );
    }

    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />;
    }
    
    return (
        <Dialog>
            <DialogTrigger disabled={disabled} asChild>
                <Button disabled={disabled} className="bg-orange-500 flex-1">Go to checkout</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <DialogTitle className="sr-only">Checkout</DialogTitle> 
                <DialogDescription className="sr-only">
                    Please complete your profile to proceed with checkout.
                </DialogDescription>
                <UserProfileForm 
                    currentUser={currentUser} 
                    onSave={onCheckout} 
                    isLoading={isGetUserLoading}
                    title="Confirm Delivery Details"
                    buttonText="Continue to payment"
                    deliveryDetailsModal={true}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutButton;
