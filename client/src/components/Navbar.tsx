import { LogOut, User } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"
import { useNavigate } from "react-router-dom"
const Navbar = () => {
    const user = localStorage.getItem("user")
    const parsedUser = user ? JSON.parse(user) : null
    const role = parsedUser?.role || "user"
    const name = parsedUser?.name || "User"
    const navigate = useNavigate()

    return (

        <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-xl font-semibold text-gray-900">{role === "admin"? "Admin": "User"} Dashboard
                        <span className="text-sm font-normal text-gray-500"> - Marriage Registration System</span>
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="font-medium">{name}</span>
                        </div>
                        <Separator orientation="vertical" className="h-6" />
                        <button
                            className="flex items-center text-sm text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
                            onClick={() => {
                                localStorage.clear()
                                navigate("/login")
                            }}
                        >
                            <LogOut className="h-4 w-4 mr-1" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar