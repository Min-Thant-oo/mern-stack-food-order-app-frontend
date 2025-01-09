import { Navigate, Route, Routes } from "react-router-dom"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<span>Home</span>} />
            <Route path="/user-profile" element={<span>User</span>} />
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    )
}