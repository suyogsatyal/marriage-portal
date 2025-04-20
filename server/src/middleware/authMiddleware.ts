import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
    user?: any
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: 'Not authorized, token missing' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        console.log(decoded)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' })
        return
    }
}

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role !== 'admin') {
        res.status(403).json({ message: 'Access denied' })
        return
    }
    next()
}
