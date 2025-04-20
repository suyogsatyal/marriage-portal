import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Props {
    children: React.ReactNode
    role: 'admin' | 'user'
}

const ProtectedRoute = ({ children, role }: Props) => {
    const { isAuthenticated, user, loading } = useAuth()

    if (loading) return null // or a spinner/placeholder if you want

    if (!isAuthenticated) return <Navigate to="/login" />
    if (user?.role !== role) return <Navigate to="/" />

    return <>{children}</>
}

export default ProtectedRoute
