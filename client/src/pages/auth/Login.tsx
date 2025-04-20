// src/pages/Login.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '../../utils/api'
import { notifySuccess, notifyError } from '../../utils/notify'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from '../../components/ui/button'
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await loginUser({ email, password })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            notifySuccess('Login successful')
            console.log(res.data.user)
            // Redirect based on role
            if (res.data.user.role == 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/dashboard')
            }
        } catch (err: any) {
            const message =
                err?.response?.data?.message || 'Login failed. Check credentials'
            notifyError(message)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Welcome To <br /> Marriage Registration System</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to sign in to your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
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
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
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
                            {"Sign in"}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <a href="/register" className="font-medium text-primary hover:underline">
                                Create an account
                            </a>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
