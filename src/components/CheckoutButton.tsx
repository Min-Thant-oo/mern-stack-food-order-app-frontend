import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";

const CheckoutButton = () => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
    
    const { pathname } = useLocation();

    // if there is returnTo value in appState after login, redirect user to that page 
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

    if (isAuthLoading) {
        return <LoadingButton />;
    }
    
  return (
    <div>CheckoutButton</div>
  )
}

export default CheckoutButton