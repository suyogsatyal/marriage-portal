// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Props {
    children: React.ReactNode
    role: 'admin' | 'user'
}

const ProtectedRoute = ({ children, role }: Props) => {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated) return <Navigate to="/login" />
    if (user?.role !== role) return <Navigate to="/" /> // or a 403 page

    return <>{children}</>
}

export default ProtectedRoute
