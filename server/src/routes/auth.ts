import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { generateToken } from '../utils/generateToken'

const authRouter = Router()
const prisma = new PrismaClient()

authRouter.post('/login', async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        console.log('User found:', user.email)
        console.log("Hashed Password:", user.password)
        console.log("Provided Password:", password)
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = generateToken(user)

        return res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        console.error('Login Error:', error)
        return res.status(500).json({ message: 'Server error' })
    }
})

authRouter.post('/register', async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER', // or 'ADMIN' if you want to allow role from request
            },
        })

        const token = generateToken(newUser)

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        })
    } catch (error) {
        console.error('Register Error:', error)
        return res.status(500).json({ message: 'Server error' })
    }
})


export default authRouter
