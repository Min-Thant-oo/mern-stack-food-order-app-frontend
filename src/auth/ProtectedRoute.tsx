import Spinner from "@/components/Spinner";
import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <Spinner />; 
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute;