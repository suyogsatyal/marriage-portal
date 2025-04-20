// src/pages/Register.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../utils/api'
import { notifySuccess, notifyError } from '../../utils/notify'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from '../../components/ui/button'
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await registerUser({ name, email, password })
            notifySuccess('Registration successful')
            navigate('/login')
        } catch (err: any) {
            const message =
                err?.response?.data?.message || 'Registration failed. Try again'
            notifyError(message)
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">Enter your information to create your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">
                            {"Create account"}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <a href="/login" className="font-medium text-primary hover:underline">
                                Sign in
                            </a>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
