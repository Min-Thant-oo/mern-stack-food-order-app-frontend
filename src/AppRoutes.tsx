import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Layout from "./layouts/layout"
import HomePage from "./pages/HomePage"
import AuthCallbackPage from "./pages/AuthCallbackPage"
import UserProfilePage from "./pages/UserProfilePage"
import ProtectedRoute from "./auth/ProtectedRoute"
import ManageRestaurantPage from "./pages/ManageRestaurantPage"
import SearchPage from "./pages/SearchPage"
import DetailPage from "./pages/DetailPage"
import OrderStatusPage from "./pages/OrderStatusPage"
import ReactGA from 'react-ga4';
import { useEffect } from "react"

export const AppRoutes = () => {

    const location = useLocation();

    useEffect(() => {
        // Send pageview to GA
        ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);

    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <Layout showHero={true}>
                        <HomePage />
                    </Layout>
                } 
            />

            <Route path="/auth-callback" element={<AuthCallbackPage />} />

            <Route 
                path="/search/:city" 
                element={
                    <Layout>
                        <SearchPage />
                    </Layout>
                } 
            />
            
            <Route 
                path="/detail/:restaurantId" 
                element={
                    <Layout>
                        <DetailPage />
                    </Layout>
                } 
            />
            
            <Route element={<ProtectedRoute />}>
                <Route 
                    path="/user-profile" 
                    element={
                        <Layout>
                            <UserProfilePage />
                        </Layout>
                    } 
                />
                
                <Route 
                    path="/manage-restaurant" 
                    element={
                        <Layout>
                            <ManageRestaurantPage />
                        </Layout>
                    } 
                />
                
                <Route 
                    path="/order-status" 
                    element={
                        <Layout>
                            <OrderStatusPage />
                        </Layout>
                    } 
                />

            </Route>

            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    )
}