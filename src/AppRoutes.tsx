import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout>HOme</Layout>} />
            <Route path="/user-profile" element={<span>User</span>} />
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    )
}