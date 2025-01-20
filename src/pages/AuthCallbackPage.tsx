import { useCreateMyUser } from "@/api/MyUserApi";
import Spinner from "@/components/Spinner";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();

    const hasCreatedUser = useRef(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const handleUserCreation = async () => {
            if (user?.sub && user?.email && !hasCreatedUser.current) {
                hasCreatedUser.current = true; // Ensure this runs only once
                try {
                    await createUser({ auth0Id: user.sub, email: user.email }); // Wait for user creation
                } catch (error) {
                    console.error("Error creating user:", error);
                } finally { 
                    const searchParams = new URLSearchParams(window.location.search);
                    const returnTo = searchParams.get('returnTo') || '/';
                    navigate(returnTo); // Redirect after user creation
                    setLoading(false);
                }
            }
        };

        handleUserCreation();
    }, [user, createUser, navigate]);

    if (loading) {
        return <Spinner />; // Show the spinner while loading
    }

    return <Spinner />;
};


export default AuthCallbackPage;
