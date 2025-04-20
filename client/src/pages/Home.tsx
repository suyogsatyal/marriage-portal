import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user') // Assuming role is stored with login

        if (token && user) {
            const parsedUser = JSON.parse(user)
            if (parsedUser.role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/dashboard')
            }
        } else {
            navigate('/login')
        }
    }, [navigate])

    return null
}

export default Home
